const Post = require("../modals/Post");

let postCache = {
  data: null,
  timestamp: null,
  expiration: 60,
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json({ posts });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
const getSinglePost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const post = await Post.findOne({ _id: postID });
    if (!post) {
      return res.status(404).json({ msg: `No task with id:${postID}` });
    }
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const post = await Post.findOneAndUpdate({ _id: postID }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({ msg: `No task with id:${postID}` });
    }

    res.status(200).json({ id: postID, data: req.body });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id: postID } = req.params;
    const post = await Post.findOneAndDelete({ _id: postID });
    if (!post) {
      return res.status(404).json({ msg: `No task with id:${postID}` });
    }
    res.status(201).json({ post });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const toggleLike = async (req, res) => {
  try {
    const { postId } = req.body;
    const { userId } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    const userIndex = post.likes.indexOf(userId);

    if (userIndex === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(userIndex, 1);
    }
    await post.save();
    res
      .status(200)
      .json({ msg: "Like toggled successfully", likes: post.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const getlikes = async (req, res) => {
  try {
    const { postId } = req.body;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(200).json({ likes: post.likes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};


module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  getlikes,
};
