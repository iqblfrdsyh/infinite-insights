const express = require("express");
const router = express.Router();

const {
  getUsers,
  userSignup,
  checkLogin,
  userLogout,
  updateUser,
  userLogin,
  getUserById,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middleware/verifyToken");
const { refreshToken } = require("../helper/refreshToken");

router.get("/users", getUsers);
router.get("/user", getUserById);
router.post("/user/signup", userSignup);
router.post("/user/signin", userLogin);
router.put("/user/update", verifyToken, updateUser);
router.get("/user/me", verifyToken, checkLogin);
router.get("/token", refreshToken);
router.delete("/user/logout", userLogout);

module.exports = router;
