const sequelize = require("../models/index.js").sequelize;
const { DataTypes } = require("sequelize");

const User = require("../models/user.js")(sequelize, DataTypes);
const Blog = require("../models/blog.js")(sequelize, DataTypes);

User.hasMany(Blog, {
  foreignKey: "userId",
  as: "blogs",
});

Blog.belongsTo(User, {
  foreignKey: "userId",
  as: "blogs",
});

module.exports = { User, Blog };
