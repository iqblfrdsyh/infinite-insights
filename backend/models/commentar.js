'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commentar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Commentar.init({
    blogId: DataTypes.INTEGER,
    userId: DataTypes.STRING,
    commentar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Commentar',
  });
  return Commentar;
};