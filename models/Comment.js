"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
      Body: DataTypes.TEXT,
      IsDeleted: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER,
      Username: DataTypes.STRING,
      PostId: DataTypes.INTEGER,
      ParentId: DataTypes.INTEGER,
      ChildId: DataTypes.INTEGER,
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: "Username",
      onDelete: "CASCADE",
    });
    Comment.belongsTo(models.User, {
      foreignKey: "UserId",
      onDelete: "CASCADE",
    });
    Comment.belongsTo(models.Post, {
      foreignKey: "PostId",
      onDelete: "CASCADE",
    });
    Comment.belongsTo(models.Comment, { foreignKey: "ParentId" });
    Comment.belongsTo(models.Comment, { foreignKey: "ChildId" });
    Comment.hasMany(models.CommentLike, { foreignKey: "id" });
    Comment.hasMany(models.CommentDislike, { foreignKey: "id" });
    Comment.hasMany(models.Comment, {
      defaultValue: null,
      foreignKey: "ChildId",
    });
    Comment.hasOne(models.Comment, {
      defaultValue: null,
      foreignKey: "ParentId",
      onDelete: "restrict",
    });
  };
  return Comment;
};
