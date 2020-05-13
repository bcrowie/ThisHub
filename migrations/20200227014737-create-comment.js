"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Comments", {
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
      },
      PostId: {
        type: Sequelize.UUID,
        references: {
          model: "Posts",
          key: "id",
        },
        onDelete: "CASCADE",
        allowNull: false,
      },
      ParentId: {
        type: Sequelize.UUID,
        references: {
          model: "Comments",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      ChildId: {
        type: Sequelize.UUID,
        references: {
          model: "Comments",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      Body: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      IsDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable("Comments");
  },
};
