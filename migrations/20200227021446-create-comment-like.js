"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("CommentLikes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      Username: {
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "Username",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      CommentId: {
        type: Sequelize.UUID,
        references: {
          model: "Comments",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("CommentLikes");
  },
};
