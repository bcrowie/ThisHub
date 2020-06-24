const { Router } = require("express");
const comments = new Router({ mergeParams: true });
const passport = require("passport");
const models = require("../models");
const { getCommentsForPost, getPostById } = require("../utils/utils");
const CommentModel = models.Comment;
const CommentLikeModel = models.CommentLike;
const PostModel = models.Post;

const response = (res, msg, status = 200) => {
  return res.status(status).json(msg);
};

// PUBLIC : Get Post by Id with Comments
comments.get("/", async (req, res) => {
  const { PostId } = req.params;
  const [Comments, Post] = await Promise.all([
    getCommentsForPost(PostId),
    getPostById(PostId),
  ]);

  Object.entries(Comments).forEach(([key, value]) => {
    value.dataValues.Score =
      value.dataValues.LikeCount - value.dataValues.DislikeCount;
  });

  Post.dataValues.Score =
    Post.dataValues.LikeCount - Post.dataValues.DislikeCount;

  if (Post && Comments) {
    return response(res, { Post, Comments });
  } else {
    return response(res, { msg: "Unable to get comments" }, 400);
  }
});

// PUBLIC Route : Get single comment with replies
comments.get("/:id", async (req, res) => {
  const { id } = req.params;
  const comment = await CommentModel.findOne({ where: { id } });
  let chain = {};
  let stack = [];

  const getReplies = async (cmnt) => {
    while (stack) {
      let next = stack.pop();
      const children = await CommentModel.findAll({
        where: { id: cmnt.dataValues.ChildId },
      });
      const parents = await CommentModel.findAll({
        where: { id: cmnt.dataValues.ParentId },
      });
      if (children) {
        for (let i = 0; i < children.length; i++) {
          if (
            !chain[children[i].dataValues.id] &&
            children[i].dataValues.id !== undefined
          ) {
            stack.push(children[i].dataValues.id);
          }
        }
      }
      if (parents) {
        for (let i = 0; i < parents.length; i++) {
          if (
            !chain[parents[i].dataValues.id] &&
            parents[i].dataValues.id !== undefined
          ) {
            stack.push(parents[i].dataValues.id);
          }
        }
      }
      if (next) {
        const comment = await CommentModel.findOne({ where: { id: next } });
        chain[comment.dataValues.id] = comment.dataValues;
        return await getReplies(comment);
      }
      return;
    }
    return;
  };

  if (comment) {
    stack.push(comment.dataValues.id);
    await getReplies(comment);
    return response(res, chain);
  } else {
    return response(res, { msg: "Comment not found" }, 404);
  }
});
// PRIVATE : New comment reply
comments.post(
  "/:ParentId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req);
    const { PostId, ParentId } = req.params;
    const { Username } = req.user.dataValues;
    const { Body } = req.body;

    const parent = await CommentModel.findOne({ where: { id: ParentId } });
    const comment = await CommentModel.create({
      Body,
      Username,
      PostId,
      ParentId,
    });
    await CommentLikeModel.create({
      Username,
      CommentId: comment.dataValues.id,
      Liked: true,
    }).catch((err) => {
      return response(res, err, 400);
    });
    parent.update({ ChildId: comment.dataValues.id });
    return response(res, { msg: "Comment reply added", comment });
  }
);
//  PRIVATE : New comment
comments.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { PostId } = req.params;
    const { Body } = req.body;
    const { Username } = req.user.dataValues;
    const post = await PostModel.findOne({ where: { id: PostId } });

    if (!post) {
      return response(res, "Post not found.", 404);
    } else {
      const comment = await CommentModel.create({
        Body,
        PostId,
        Username,
      });
      if (comment) {
        await CommentLikeModel.create({
          Username,
          CommentId: comment.dataValues.id,
        });
        return response(res, { msg: "New post comment", comment });
      } else {
        return response(res, "Something went wrong");
      }
    }
  }
);

// PRIVATE : Edit comment
comments.put(
  "/:CommentId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { CommentId } = req.params;
    const { Body } = req.body;
    const editedComment = await CommentModel.update(
      { Body },
      { where: { id: CommentId } }
    );
    if (!editedComment) {
      return response(res, "Unable to find post", 400);
    } else {
      return response(res, editedComment);
    }
  }
);

// PRIVATE : Delete comment
comments.delete(
  "/:CommentId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = req.params.CommentId;
    await CommentModel.update({ IsDeleted: true }, { where: { id } }).catch(
      (err) => {
        return response(res, error, 400);
      }
    );
    return response(res, "Comment deleted");
  }
);

// PRIVATE : Like comment
comments.post(
  "/:CommentId/:Like",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { CommentId, Like } = req.params;
    const { Username } = req.user.dataValues;
    const Liked = Like == 1 ? true : false;
    const comment = await CommentModel.findOne({ where: { id: CommentId } });

    if (!comment) return response(res, "Comment not found", 404);
    else {
      const userExists = await CommentLikeModel.findOne({
        where: { Username },
      });
      if (userExists) {
        const userLiked = userExists.dataValues.Liked;
        if (
          ((userLiked && Liked) || (!userLiked && !Liked)) &&
          userLiked !== null
        ) {
          userExists.update({ Liked: null });
          return response(res, "Removed like");
        } else {
          userExists.update({ Liked });
          return response(res, Liked ? "Liked comment" : "Disliked comment");
        }
      } else {
        // This needs to be updated
        const newLike = await CommentLikeModel.create({
          CommentId,
          Username,
          Liked,
        });
        if (newLike) {
          return response(res, Liked ? "Liked comment" : "Disliked comment");
        } else {
          return response(res, "Something went wrong", 400);
        }
      }
    }
  }
);

module.exports = comments;
