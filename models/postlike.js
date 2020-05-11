"use strict";

module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define(
    "PostLike",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      PostId: DataTypes.INTEGER,
      Username: DataTypes.STRING,
    },
    {}
  );
  PostLike.associate = function (models) {
    PostLike.belongsTo(models.Post, {
      foreignKey: "id",
      onDelete: "CASCADE",
    });
    PostLike.belongsTo(models.User, {
      foreignKey: "Username",
      onDelete: "CASCADE",
    });
  };
  return PostLike;
};
