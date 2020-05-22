const sequelize = require("sequelize");
const models = require("../models");
const CommentModel = models.Comment;
const CommentLikeModel = models.CommentLike;
const CommentDislikeModel = models.CommentDislike;
const PostModel = models.Post;
const PostLikeModel = models.PostLike;
const PostDislikeModel = models.PostDislike;

module.exports = {
  filterLikedPosts: (posts, likes) => {
    const results = [];

    posts.forEach((post) => {
      likes.forEach((like) => {
        if (post.id === like.PostId) {
          results.push(post);
        }
      });
    });

    return results;
  },
  getPosts: async () => {
    return await PostModel.findAll({
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
  },
  getPostsWithAuth: async (Username) => {
    return await PostModel.findAll({
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
          attributes: ["Username"],
          where: { Username },
          required: false,
        },
        {
          model: PostDislikeModel,
          attributes: ["Username"],
          where: { Username },
          required: false,
        },
      ],
      group: ["Post.id", "PostLikes.id", "PostDislikes.id"],
      order: [["createdAt", "DESC"]],
    });
  },
  getPostById: async (id) => {
    return await PostModel.findOne({
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
      where: { id },
    });
  },
  getCommentsForPost: async (PostId) => {
    return await CommentModel.findAll({
      attributes: [
        "id",
        "Username",
        "PostId",
        "ParentId",
        "ChildId",
        "Level",
        "Body",
        "IsDeleted",
        "createdAt",
        "updatedAt",
        [
          sequelize.fn("COUNT", sequelize.col("CommentLikes.CommentId")),
          "LikeCount",
        ],
        [
          sequelize.fn("COUNT", sequelize.col("CommentDislikes.CommentId")),
          "DislikeCount",
        ],
      ],
      where: { PostId },
      include: [
        {
          model: CommentLikeModel,
          attributes: [],
        },
        {
          model: CommentDislikeModel,
          attributes: [],
        },
      ],
      group: ["Comment.id"],
      order: [
        ["Level", "ASC"],
        ["createdAt", "DESC"],
      ],
    });
  },
};
