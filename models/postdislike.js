"use strict";

module.exports = (sequelize, DataTypes) => {
  const PostDislike = sequelize.define(
    "PostDislike",
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
      Disliked: DataTypes.BOOLEAN,
      PostId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {}
  );
  PostDislike.associate = function (models) {
    PostDislike.belongsTo(models.Post);
    PostDislike.belongsTo(models.User);
  };
  return PostDislike;
};
