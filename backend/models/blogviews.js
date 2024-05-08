'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogViews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BlogViews.init({
    blogId: DataTypes.INTEGER,
    viewedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BlogViews',
  });
  return BlogViews;
};