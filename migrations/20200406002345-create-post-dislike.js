"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("PostDislikes", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      PostId: {
        type: Sequelize.UUID,
        references: {
          model: "Posts",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE",
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
    return queryInterface.dropTable("PostDislikes");
  },
};
