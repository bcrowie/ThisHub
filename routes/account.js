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
    const user = await User.findOne({
      where: { Username: req.user.dataValues.Username },
    });

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
      where: { Username: req.user.dataValues.Username },
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
      where: { Username: req.user.dataValues.Username },
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
      where: { Username: req.user.dataValues.Username },
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
      where: { Username: req.user.dataValues.Username, isDeleted: false },
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
    const { id } = req.user.dataValues;
    const { Old, Password } = req.body;
    let { errors, isValid } = validatePassword(req.body);

    if (!Old) {
      errors.Match = "Old password is required";
      isValid = false;
    }

    if (!isValid) {
      return response(res, errors, 400);
    }

    const User = await UserModel.findOne({ where: { id } });

    if (User) {
      await bcrypt.compare(Old, User.dataValues.Password).then((isMatch) => {
        if (isMatch) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(Password, salt, (err, hash) => {
              if (err) return next(err);
              UserModel.update(
                { Password: hash },
                { where: { id: req.user.dataValues.id } }
              ).then(() => {
                return response(res, "Password updated successfully");
              });
            });
          });
        } else {
          errors.Match = "Old password is incorrect";
          return response(res, errors);
        }
      });
    } else {
      return response(res, { msg: "Something went wrong" });
    }
  }
);

// Delete current account
account.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const confirm = await User.destroy({
      where: { Username: req.user.dataValues.Username },
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
    const { Username } = req.user.dataValues;
    const userExists = await Payment.findOne({ where: { Username } });
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

    newPaymentInfo.Username = req.user.dataValues.Username;
    const userExists = await Payment.findOne({
      where: { Username: newPaymentInfo.Username },
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
