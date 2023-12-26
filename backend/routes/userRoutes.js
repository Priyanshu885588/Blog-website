const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getuserProfile,
  updateUserProfile,
  getUserPosts
} = require("../contollers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect,getuserProfile).put(protect,updateUserProfile);
router.get("/:userId/posts",getUserPosts)

module.exports = router;
