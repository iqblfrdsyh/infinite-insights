const express = require("express");
const router = express.Router();

const {
  getUsers,
  userSignup,
  checkLogin,
  userLogout,
  updateUser,
  userLogin,
} = require("../controllers/userControllers");

router.get("/users", getUsers);
router.post("/user/signup", userSignup);
router.put("/user/login", userLogin);
router.get("/user/me", checkLogin);
router.delete("/user/logout", userLogout);

module.exports = router;
