"use strict";

module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define(
    "PostLike",
    {
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
