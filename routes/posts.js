const { Router } = require("express");
const sequelize = require("sequelize");
const posts = new Router();
const passport = require("passport");
const validatePost = require("../validation/post");
const models = require("../models");
const PostModel = models.Post;
const PostLikeModel = models.PostLike;
const PostDislikeModel = models.PostDislike;
const comments = require("./comments");

posts.use("/:postId/comments", comments);

const response = (res, msg, status = 200) => {
  return res.status(status).json(msg);
};

// PUBLIC : GET All
posts.get("/", async (req, res, next) => {
  const posts = await PostModel.findAll({
    attributes: [
      "id",
      "Username",
      "Title",
      "Body",
      "createdAt",
      "updatedAt",
      [sequelize.fn("COUNT", sequelize.col("PostLikes.PostId")), "LikeCount"],
      [
        sequelize.fn("COUNT", sequelize.col("PostDislikes.PostId")),
        "DislikeCount",
      ],
    ],
    include: [
      {
        model: PostLikeModel,
        attributes: [],
      },
      {
        model: PostDislikeModel,
        attributes: [],
      },
    ],
    group: ["Post.id"],
    order: [["createdAt", "DESC"]],
  });

  Object.entries(posts).forEach(([key, value]) => {
    value.dataValues.Score =
      value.dataValues.LikeCount - value.dataValues.DislikeCount;
  });

  if (posts) {
    return response(res, posts);
  }
  return response(res, { msg: "Something went wrong" }, 400);
});

// PUBLIC : GET one by ID
posts.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const post = await PostModel.findOne({ where: { id } });
  if (post) {
    return response(res, post);
  } else {
    return response(res, { msg: "Post not found" }, 404);
  }
});

// PRIVATE : Create new post
posts.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { errors, isValid } = validatePost(req.body);
    const { Title, Body } = req.body;
    const { id, Username } = req.user.dataValues;

    if (!isValid) return response(res, errors, 400);

    const post = await PostModel.create({
      Title,
      Body,
      UserId: id,
      Username,
    });

    const postLike = await PostLikeModel.create({
      PostId: post.dataValues.id, 
      UserId: id, 
      Liked: true})

    if (post && postLike) {
      return response(res, { msg: "Post added" });
    }
    return response(res, { msg: "Something went wrong." }, 400);
  }
);

// PRIVATE : Delete Post
posts.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { id } = req.params;
    const UserId = req.user.dataValues.id;
    const post = await PostModel.findOne({ where: { id } });

    if (UserId === post.dataValues.UserId) {
      const confirmed = await PostModel.destroy({ where: { id } });

      if (confirmed) {
        return response(res, { msg: "Post deleted." });
      }
    } else {
      return response(res, { msg: "Permission denied." }, 401);
    }
    return response(res, { msg: "Something went wrong" }, 400);
  }
);

// PRIVATE : Edit Post
posts.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { id } = req.params;
    const updated = await PostModel.update(
      { Body: req.body.Body },
      { where: { id } }
    );

    if (updated) {
      return response(res, { msg: "Post updated successfully." });
    } else {
      return response(res, { msg: "Something went wrong" }, 400);
    }
  }
);

// Private Route : Like post
posts.post(
  "/:PostId/:Like",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { PostId, Like } = req.params;
    const UserId = req.user.dataValues.id;
    const post = await PostModel.findOne({ where: { id: PostId } });

    if (!post) {
      return response(res, "Post not found.", 404);
    } else {
      // PROMISE.ALL
      const PostAlreadyLiked = await PostLikeModel.findOne({
        where: { UserId, PostId },
      });
      const PostAlreadyDisliked = await PostDislikeModel.findOne({
        where: { UserId, PostId },
      });
      let confirmDestroy = null;

      if (Like == 1) {
        if ( PostAlreadyLiked ) {
          confirmDestroy = await PostAlreadyLiked.destroy()

          if (confirmDestroy) {
            return response(res, { msg: "Removed Like" });
          }
        } else {
          const confirmLike = await PostLikeModel.create({
            PostId,
            UserId,
            Liked: true,
          });

          if( PostAlreadyDisliked ) {
            confirmDestroy = await PostAlreadyDisliked.destroy();
            if( confirmDestroy && confirmLike ) {
              return response( res, { msg: "Liked and Disliked" }) 
            }
          } else if ( confirmLike ) {
            return response( res, { msg: "Liked" })
          }
        }
      } else if (Like == 0) {
        if ( PostAlreadyDisliked ) {
          confirmDestroy = await PostAlreadyDisliked.destroy()
          if( confirmDestroy ) {
            return response( res, { msg: "Removed Dislike" })
          }
        } else {
          const confirmDislike = await PostDislikeModel.create({
            PostId,
            UserId,
            Disliked: true,
          });
          if ( PostAlreadyLiked ) {
            confirmDestroy = await PostAlreadyLiked.destroy();
            if( confirmDestroy && confirmDislike ){
              return response( res, { msg: "Disliked and Liked" })
            } else if ( confirmDislike ) {
              return response( res, { msg: "Removed Dislike" })
            }
          }
        }
        if (confirmDislike) {
          return response(res, { msg: "Disliked" });
        }
      }
    }
    return response(res, { msg: "Something went wrong" }, 400);
  }
);

module.exports = posts;
