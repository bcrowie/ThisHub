"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      Body: DataTypes.TEXT,
      IsDeleted: DataTypes.BOOLEAN,
      Username: DataTypes.STRING,
      PostId: DataTypes.INTEGER,
      ParentId: DataTypes.INTEGER,
      ChildId: DataTypes.INTEGER,
      Level: DataTypes.INTEGER,
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: "Username",
      onDelete: "SET NULL",
    });
    Comment.belongsTo(models.Post, {
      foreignKey: "id",
      onDelete: "CASCADE",
    });
    Comment.belongsTo(models.Comment, {
      foreignKey: "ParentId",
      onDelete: "CASCADE",
    });
    Comment.belongsTo(models.Comment, {
      foreignKey: "ChildId",
      onDelete: "CASCADE",
    });
    Comment.hasMany(models.CommentLike, {
      foreignKey: "id",
      onDelete: "CASCADE",
    });
    Comment.hasMany(models.CommentDislike, {
      foreignKey: "id",
      onDelete: "CASCADE",
    });
    Comment.hasMany(models.Comment, {
      defaultValue: null,
      foreignKey: "ChildId",
      onDelete: "CASCADE",
    });
    Comment.hasOne(models.Comment, {
      defaultValue: null,
      foreignKey: "ParentId",
      onDelete: "CASCADE",
    });
  };
  return Comment;
};
