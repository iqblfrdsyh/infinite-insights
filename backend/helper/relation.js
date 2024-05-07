const sequelize = require("../models/index.js").sequelize;
const { DataTypes } = require("sequelize");

const User = require("../models/user.js")(sequelize, DataTypes);
const Blog = require("../models/blog.js")(sequelize, DataTypes);
const BlogViews = require("../models/blogviews.js")(sequelize, DataTypes);
const Category = require("../models/category.js")(sequelize, DataTypes);
const BlogCategory = require("../models/blogcategory.js")(sequelize, DataTypes);
const Commentar = require("../models/commentar.js")(sequelize, DataTypes);

User.hasMany(Blog, {
  foreignKey: "userId",
  as: "blogs",
});

Blog.belongsTo(User, {
  foreignKey: "userId",
  as: "users",
});

Blog.hasMany(BlogViews, {
  foreignKey: "blogId",
});

BlogViews.belongsTo(Blog, {
  foreignKey: "blogId",
});

Blog.belongsToMany(Category, {
  through: BlogCategory,
  foreignKey: "blogId",
  as: "categories",
});

Category.belongsToMany(Blog, {
  through: BlogCategory,
  foreignKey: "categoryId",
  as: "blogs",
});

Blog.hasMany(Commentar, {
  foreignKey: "blogId",
  as: "comments",
});

Commentar.belongsTo(Blog, {
  foreignKey: "blogId",
  as: "blog",
});

User.hasMany(Commentar, {
  foreignKey: "userId",
  as: "comments",
});

Commentar.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = { User, Blog, BlogViews, BlogCategory, Category, Commentar };
