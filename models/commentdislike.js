"use strict";

module.exports = (sequelize, DataTypes) => {
  const CommentDislike = sequelize.define(
    "CommentDislike",
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
  CommentDislike.associate = function (models) {
    CommentDislike.belongsTo(models.User, {
      foreignKey: "Username",
      onDelete: "CASCADE",
    });
    CommentDislike.belongsTo(models.Comment, {
      foreignKey: "id",
      onDelete: "NO ACTION",
    });
  };
  return CommentDislike;
};
