const express = require("express");
const router = express.Router();
const {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  getBlogByCategory,
  searchBlogs,
} = require("../controllers/blogControllers");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/blogs", getBlogs);
router.get("/blog", verifyToken, getBlogById);
router.get("/blogs/category", getBlogByCategory);
router.get("/blogs/search", searchBlogs);
router.post("/blog/create", verifyToken, createBlog);
router.put("/blog/update", updateBlog);
router.delete("/blog/delete", deleteBlog);

module.exports = router;
