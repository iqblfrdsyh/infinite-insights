"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Blog.init(
    {
      userId: DataTypes.STRING,
      categoryId: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      author: DataTypes.STRING,
      thumbnail: DataTypes.TEXT,
      source_link: DataTypes.TEXT,
      views: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM("Published", "Archived"),
      },
    },
    {
      sequelize,
      modelName: "Blog",
    }
  );
  return Blog;
};
