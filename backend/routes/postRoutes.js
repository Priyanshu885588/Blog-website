const express = require("express")
const router = express.Router();

const {
    getAllPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost
}=require('../contollers/posts')

router.route("/").get(getAllPosts).post(createPost);
router.route("/:id").get(getSinglePost).patch(updatePost).delete(deletePost);

module.exports = router;