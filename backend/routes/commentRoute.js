const express = require("express");
const router = express.Router();
const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/commentarControllers");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/comments", getComments);
router.post("/comment/create", verifyToken, createComment);
router.delete("/comment/delete", deleteComment);

module.exports = router;
