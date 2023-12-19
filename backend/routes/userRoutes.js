const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
  getuserProfile,
  updateUserProfile,
} = require("../contollers/userController");

router.post("/", registerUser);
router.post("/auth", authUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getuserProfile).put(updateUserProfile)




module.exports = router;
