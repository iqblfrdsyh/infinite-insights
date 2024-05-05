const express = require("express");
const router = express.Router();
const {
  getComments,
  createComment,
} = require("../controllers/commentarControllers");
const { verifyToken } = require("../middleware/verifyToken");

router.get("/comments", getComments);
router.post("/comment/create", verifyToken, createComment);

module.exports = router;
