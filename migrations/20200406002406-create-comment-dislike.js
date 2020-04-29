"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("CommentDislikes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      Disliked: {
        type: Sequelize.BOOLEAN,
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
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
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
    return queryInterface.dropTable("CommentDislikes");
  },
};
