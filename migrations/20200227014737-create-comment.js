"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Comments", {
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
      PostId: {
        type: Sequelize.UUID,
        references: {
          model: "Posts",
          key: "id"
        },
        allowNull: false
      },
      ParentId: {
        type: Sequelize.UUID,
        references: {
          model: "Comments",
          key: "id"
        }
      },
      ChildId: {
        type: Sequelize.UUID,
        references: {
          model: "Comments",
          key: "id"
        }
      },
      Body: {
        type: Sequelize.TEXT
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    return queryInterface.dropTable("Comments");
  }
};
