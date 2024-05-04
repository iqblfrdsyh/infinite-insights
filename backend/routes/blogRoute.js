const express = require("express");
const router = express.Router();
const {
  getBlogs,
  createBlog,
  getBlogById,
} = require("../controllers/blogControllers");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/blogs", getBlogs);
router.get("/blog/:blogId", verifyToken, getBlogById);
router.post("/blog/create", verifyToken, createBlog);

module.exports = router;
