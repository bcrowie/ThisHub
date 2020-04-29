"use strict";

module.exports = (sequelize, DataTypes) => {
  const CommentDislike = sequelize.define(
    "CommentDislike",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
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
