const { Router } = require("express");
const users = new Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");
const models = require("../models");
const account = require("./account");
const PostModel = models.Post;
const UserModel = models.User;

const response = (res, msg, status = 200) => {
  return res.status(status).json(msg);
};

// All user account routes
users.use("/my-account", account);

// PUBLIC Route : Get user by username
users.get("/:Username", async (req, res) => {
  const User = await UserModel.findOne({
    where: { Username: req.params.Username },
  });
  const Posts = await PostModel.findAll({
    where: { Username: req.params.Username },
  });
  if (User && Posts) {
    return response(res, {
      id: User.id,
      Username: User.Username,
      createdAt: User.createdAt,
      Posts,
    });
  } else {
    return response(res, "User not found.", 404);
  }
});

// PUBLIC Route : Register new user
users.post("/register", async (req, res, next) => {
  const { errors, isValid } = validateRegister(req.body);
  const { Username, Email, Password } = req.body;

  if (!isValid) {
    return response(res, errors, 400);
  }

  const User = await UserModel.findOne({
    where: { Username, Email },
  });

  if (User) {
    User.dataValues.Username === req.body.Username
      ? (errors.Username = "Username already exists")
      : (errors.Email = "Email already exists");
    return response(res, errors, 400);
  } else {
    const newUser = {
      Username,
      Email,
      Password,
    };

    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(Password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        newUser.Password = hash;
        UserModel.create(newUser).then(() => {
          res.redirect("/login");
        });
      });
    });
  }
});

// PUBLIC Route : Login
users.post("/login", async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  const { Email, Password } = req.body;
  console.log(req.body)
  if (!isValid) {
    return response(res, errors, 400);
  }

  const User = await UserModel.findOne({ where: { Email } });

  if (!User) {
    errors.Email = "Account with that email doesnt exist.";
    return response(res, { Account: errors.Email }, 404);
  } else {
    const match = await bcrypt.compare(Password, User.Password);

    if (match) {
      const payload = {
        id: User.dataValues.id,
        Username: User.dataValues.Username,
      };
      await jwt.sign(
        payload,
        keys.secretOrKey,
        { expiresIn: "12h" },
        (err, token) => {
          res.json({ success: true, token: "Bearer " + token, Username: User.dataValues.Username });
        }
      );
    } else {
      errors.Password = "Password is incorrect";
      return response(res, errors, 400);
    }
  }
});

users.post("/auth", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return response(res, "Unauthorized: No token provided", 401);
  } else {
    const user = await UserModel.findOne({Where: {Username: req.body.Username}})
    await jwt.verify(token, keys.secretOrKey, (err, decoded) => {
      if (err) {
        return response(res, "Unauthorized: Invalid token", 401);
      } else {
          
          return response(res, {Email: user.Email, Username: user.Username, createdAt: user.createdAt, id: user.id}, 200)
      }
    });
  }
});

module.exports = users;
