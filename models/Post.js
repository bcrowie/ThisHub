"use strict";

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      Title: DataTypes.STRING,
      Body: DataTypes.TEXT,
      UserId: DataTypes.INTEGER,
      Username: DataTypes.STRING,
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      key: "Username",
      onDelete: "CASCADE",
    });
    Post.hasMany(models.Comment);
    Post.hasMany(models.PostLike, { onDelete: "CASCADE" });
    Post.hasMany(models.PostDislike, { onDelete: "CASCADE" });
  };
  return Post;
};
