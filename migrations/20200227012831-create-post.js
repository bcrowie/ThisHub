"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      UserId: {
        type: Sequelize.UUID,
        references: {
          model: "Users",
          key: "id"
        },
        allowNull: false
      },
      Username: {
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "Username"
        }
      },
      Title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Body: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Posts");
  }
};
