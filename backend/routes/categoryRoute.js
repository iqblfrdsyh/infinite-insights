const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");

router.get("/categories", getCategories);
router.post("/category/create", createCategory);
router.delete("/category/delete", deleteCategory);

module.exports = router;
