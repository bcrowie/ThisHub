"use strict";

module.exports = (sequelize, DataTypes) => {
  const CommentLike = sequelize.define(
    "CommentLike",
    {
      Liked: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER,
      CommentId: DataTypes.INTEGER,
    },
    {}
  );
  CommentLike.associate = function (models) {
    CommentLike.belongsTo(models.User, {
      foreignKey: "id",
      onDelete: "cascade",
    });
    CommentLike.belongsTo(models.Comment, { foreignKey: "id" });
  };
  return CommentLike;
};
