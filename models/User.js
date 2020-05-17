"use strict";

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      Username: { type: DataTypes.STRING, unique: true },
      Email: { type: DataTypes.STRING, unique: true },
      Password: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    User.hasOne(models.PaymentInfo, { foreignKey: "id", as: "PaymentId" });
    User.hasMany(models.Post, { foreignKey: "id", as: "PostId" });
    User.hasMany(models.Comment, { foreignKey: "id", as: "CommentId" });
    User.hasMany(models.PostLike, { foreignKey: "id", as: "PostLikeId" });
    User.hasMany(models.CommentLike, { foreignKey: "id", as: "CommentLikeId" });
    User.hasMany(models.PostDislike, {
      foreignKey: "id",
      as: "PostDislikeId",
    });
    User.hasMany(models.CommentDislike, {
      foreignKey: "id",
      as: "CommentDislikeId",
    });
  };
  return User;
};
