const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getuserProfile,
  updateUserProfile,
} = require("../contollers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect,getuserProfile).put(protect,updateUserProfile);

module.exports = router;
