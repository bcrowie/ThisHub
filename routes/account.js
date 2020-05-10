const { Router } = require("express");
const account = new Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const models = require("../models");
const validatePaymentInfo = require("../validation/payment");
const Payment = models.paymentInfo;
const Post = models.Post;
const PostLike = models.PostLike;
const User = models.User;

const response = (res, msg, status = 200) => {
  return res.status(status).json(msg);
};

// All routes below are PRIVATE
// Get current account
account.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await User.findOne({ where: { username: req.user.username } });

    if (user) {
      response(res, user);
    } else {
      response(res, "User not found.", 404);
    }
  }
);

// Get all user's liked posts
account.get(
  "/likes",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const posts = await PostLike.findAll({
      where: { userId: req.user.id, liked: true },
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    if (!posts) {
      return response(res, "Unable to get posts", 400);
    } else {
      return response(res, posts);
    }
  }
);

// Get all user's disliked posts
account.get(
  "/dislikes",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const posts = await PostLike.findAll({
      where: { userId: req.user.id, liked: false },
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    if (!posts) {
      return response(res, "Unable to get posts", 400);
    } else {
      return response(res, posts);
    }
  }
);

// Get all user posts
account.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const posts = await Post.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    if (!posts) {
      return response(res, "Unable to get posts", 400);
    } else {
      return response(res, posts);
    }
  }
);

// Get all user comments
account.get(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const comments = await Comment.findAll({
      where: { userId: req.user.id, isDeleted: false },
      order: [["createdAt", "DESC"]],
      limit: 20,
    });
    if (!comments) {
      return response(res, "Unable to get comments", 400);
    } else {
      return response(res, comments);
    }
  }
);

// Change user password
account.post(
  "/change-password",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const errors = {};
    const { password, password2 } = req.body;

    if (Validator.isEmpty(password) || Validator.isEmpty(password2)) {
      errors.password = "Both fields are required";
    }
    if (!Validator.equals(password, password2)) {
      errors.password = "Passwords do not match";
    }
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
      errors.password = "Password must be between 8 and 30 characters.";
    }
    if (errors) return response(res, errors, 400);

    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) return next(err);
        User.update(
          { password: hash },
          { where: { username: req.user.username } }
        ).then(() => {
          return response(res, "Password updated successfully");
        });
      });
    });
  }
);

// Delete current account
account.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const confirm = await User.destroy({
      where: { username: req.user.username },
    });

    if (confirm) {
      return response(res, "Account has been deleted");
    } else {
      return response(res, "Something went wrong.", 400);
    }
  }
);

// Get stored payment info (Research storing and printing methods)
account.get(
  "/payment-info",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.dataValues.id;
    const userExists = await Payment.findOne({ where: { userId } });
    if (userExists) {
      response(res, userExists.dataValues);
    } else {
      response(res, "Payment info not found", 400);
    }
  }
);

// Save user payment info
account.post(
  "/payment-info",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePaymentInfo(req.body);
    const newPaymentInfo = req.body;
    if (!isValid) {
      response(res, errors, 400);
    }

    newPaymentInfo.userId = req.user.dataValues.id;
    const userExists = await Payment.findOne({
      where: { userId: newPaymentInfo.userId },
    });
    if (userExists) {
      await userExists.update(newPaymentInfo);
      return response(res, "Payment Info Updated");
    } else {
      await Payment.create(newPaymentInfo);
      return response(res, "Payment Info Added");
    }
  }
);

module.exports = account;
