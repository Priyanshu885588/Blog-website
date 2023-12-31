const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  getlikes,
  createComment,
  getComments,
  getTopLikedPosts,
} = require("../contollers/posts");
const protect = require("../middleware/authMiddleware");

router.route("/").get(getAllPosts).post(createPost);
router.route("/topliked").get(getTopLikedPosts);
router.route("/:id").get(getSinglePost).patch(updatePost).delete(deletePost);
router.route("/:id/like").patch(protect, toggleLike).get(getlikes);
router.route("/:id/comments").post(protect, createComment).get(getComments);

module.exports = router;
