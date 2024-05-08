"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
      },
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      role: DataTypes.STRING,
      headline: DataTypes.STRING,
      password: DataTypes.TEXT,
      refreshToken: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
