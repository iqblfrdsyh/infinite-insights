const express = require("express");
const router = express.Router();
const {
  getBlogs,
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogControllers");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/blogs", getBlogs);
router.get("/blog", verifyToken, getBlogById);
router.post("/blog/create", verifyToken, createBlog);
router.put("/blog/update", updateBlog);
router.delete("/blog/delete", deleteBlog);

module.exports = router;
