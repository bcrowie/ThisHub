"use strict";

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      Title: DataTypes.STRING,
      Body: DataTypes.TEXT,
      Username: DataTypes.STRING,
    },
    {}
  );
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: "Username",
      onDelete: "CASCADE",
    });
    Post.hasMany(models.Comment);
    Post.hasMany(models.PostLike);
    Post.hasMany(models.PostDislike);
  };
  return Post;
};
