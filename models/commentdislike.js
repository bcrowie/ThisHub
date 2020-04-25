"use strict";

module.exports = (sequelize, DataTypes) => {
  const CommentDislike = sequelize.define(
    "CommentDislike",
    {
      Disliked: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER,
      CommentId: DataTypes.INTEGER,
    },
    {}
  );
  CommentDislike.associate = function (models) {
    CommentDislike.belongsTo(models.User, {
      foreignKey: "id",
      onDelete: "cascade",
    });
    CommentDislike.belongsTo(models.Comment, { foreignKey: "id" });
  };
  return CommentDislike;
};
