"use strict";

module.exports = (sequelize, DataTypes) => {
  const PostDislike = sequelize.define(
    "PostDislike",
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
  PostDislike.associate = function (models) {
    PostDislike.belongsTo(models.Post, {
      foreignKey: "id",
      onDelete: "CASCADE",
    });
    PostDislike.belongsTo(models.User, {
      foreignKey: "Username",
      onDelete: "CASCADE",
    });
  };
  return PostDislike;
};
