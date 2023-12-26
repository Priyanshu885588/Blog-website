const express = require("express")
const router = express.Router();
const {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
    toggleLike,
    getlikes
}=require('../contollers/posts')
const protect = require("../middleware/authMiddleware");

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getSinglePost).patch(updatePost).delete(deletePost);
router.route("/:id/like").patch(protect,toggleLike).get(getlikes);

module.exports = router;