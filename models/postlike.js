"use strict";

module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define(
    "PostLike",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
      Liked: DataTypes.BOOLEAN,
      PostId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER
    },
    {}
  );
  PostLike.associate = function(models) {
    PostLike.belongsTo(models.Post);
    PostLike.belongsTo(models.User);
  };
  return PostLike;
};
