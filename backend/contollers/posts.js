const Post = require("../modals/Post");

let postCache = {
  data: null,
  timestamp: null,
  expiration: 60,
};

const getAllPosts = async (req, res) => {
  try {
    const currentTime = new Date().getTime() / 1000;

    // Check if the cache is not empty and hasn't expired
    if (postCache.data && currentTime - postCache.timestamp < postCache.expiration) {
      console.log("Data retrieved from cache");
      return res.status(200).json({ posts: postCache.data });
    }

    // If data is not in the cache or has expired, fetch from the database
    const posts = await Post.find({});

    // Update the cache with the new data and timestamp
    postCache = {
      data: posts,
      timestamp: currentTime,
      expiration: 60, // Reset expiration time
    };

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error.message });
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
    const {id:postID}=req.params;
    const post= await Post.findOneAndUpdate({_id:postID},req.body,{
      new:true,
      runValidators:true,
    });
    if(!post){
      return res.status(404).json({msg:`No task with id:${postID}`})
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

module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
