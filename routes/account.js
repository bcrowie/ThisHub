const { Router } = require("express");
const account = new Router();
const bcrypt = require("bcryptjs");
const isEmpty = require("../validation/isEmpty");
const passport = require("passport");
const models = require("../models");
const validateEmail = require("../validation/email");
const validatePassword = require("../validation/password");
const validatePaymentInfo = require("../validation/payment");
const PaymentModel = models.paymentInfo;
const PostModel = models.Post;
const PostLikeModel = models.PostLike;
const UserModel = models.User;

const response = (res, msg, status = 200) => {
  return res.status(status).json(msg);
};

// All routes below are PRIVATE
// Get current account
account.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = await UserModel.findOne({
      where: { username: req.user.username },
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
    const posts = await PostLikeModel.findAll({
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
    const posts = await PostLikeModel.findAll({
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
    const posts = await PostModel.findAll({
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
    const { id } = req.user.dataValues;
    const { Email, Password } = req.body;
    const errors = {};
    let isValid = true;

    if (isEmpty(Email)) {
      errors.Email = "Email address required";
      isValid = false;
    }
    if (isEmpty(Password)) {
      errors.Password = "Password is required";
      isValid = false;
    }
    if (!isValid) {
      return response(res, errors, 400);
    }

    const User = await UserModel.findOne({ where: { Email } });

    if (Email !== User.dataValues.Email) {
      errors.Email = "Email address does not match address on file";
      return response(res, errors);
    }

    await bcrypt.compare(Password, User.dataValues.Password).then((isMatch) => {
      if (isMatch) {
        User.destroy();
        return response(res, { msg: "Success" });
      } else {
        errors.Password = "Password is incorrect";
        return response(res, errors, 400);
      }
    });
  }
);

// Get stored payment info (Research storing and printing methods)
account.get(
  "/payment-info",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.dataValues.id;
    const userExists = await PaymentModel.findOne({ where: { userId } });

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
    const userExists = await PaymentModel.findOne({
      where: { userId: newPaymentInfo.userId },
    });
    if (userExists) {
      await userExists.update(newPaymentInfo);
      return response(res, "Payment Info Updated");
    } else {
      await PaymentModel.create(newPaymentInfo);
      return response(res, "Payment Info Added");
    }
  }
);

account.post(
  "/change-email",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { Email, Email2 } = req.body;
    const UserId = req.user.dataValues.id;
    const { errors, isValid } = validateEmail(req.body);

    if (!isValid) {
      response(res, errors, 400);
    }

    const emailExists = await UserModel.findOne({ where: { Email } });

    if (emailExists) {
      errors.Email = "An account with that address exists already";
      return response(res, errors);
    }

    const User = await UserModel.findOne({ where: { id: UserId } });

    if (User && User.dataValues.id === UserId) {
      User.update({ Email });
      return response(res, { msg: "Email changed succesfully" });
    } else {
      return response(res, { msg: "Something went wrong" }, 400);
    }
  }
);

module.exports = account;
