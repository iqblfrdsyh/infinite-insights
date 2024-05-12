"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Blogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      content: {
        type: Sequelize.TEXT("long"),
      },
      author: {
        type: Sequelize.STRING,
      },
      thumbnail: {
        type: Sequelize.TEXT,
      },
      source_link: {
        type: Sequelize.TEXT,
      },
      views: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM("Published", "Archived"),
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Blogs");
  },
};
