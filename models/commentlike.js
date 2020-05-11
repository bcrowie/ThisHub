"use strict";

module.exports = (sequelize, DataTypes) => {
  const CommentLike = sequelize.define(
    "CommentLike",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      Username: DataTypes.STRING,
      CommentId: DataTypes.INTEGER,
    },
    {}
  );
  CommentLike.associate = function (models) {
    CommentLike.belongsTo(models.User, {
      foreignKey: "Username",
      onDelete: "CASCADE",
    });
    CommentLike.belongsTo(models.Comment, {
      foreignKey: "id",
      onDelete: "NO ACTION",
    });
  };
  return CommentLike;
};
