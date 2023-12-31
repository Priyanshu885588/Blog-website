const asyncHandler = require("express-async-handler");
const User = require("../modals/useModel");
const generateToken = require("../utils/generateToken");
const Post = require("../modals/Post");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Inavlid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User alerady exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    const token = generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error("Inavlid user data");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
});

const getuserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
}); //@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    const posts = await Post.find({ authorId: updatedUser._id }).populate(
      "authorId"
    );
    if (posts.length > 0) {
      for (const post of posts) {
        post.author = updatedUser.name;
        await post.save();
      }
    } else {
      // Handle the case where no posts with the specified authorId were found
    }

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: req.body.token,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
}); //@access.private

const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ authorId: userId });

    if (!userPosts || userPosts.length === 0) {
      return res
        .status(404)
        .json({ msg: "No blog posts found for the specified user" });
    }

    res.status(200).json({ userPosts });
  } catch (error) {
    console.error("Error fetching user's blog posts:", error);
    res.status(500).json({ msg: "Server error" });
  }
};



module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getuserProfile,
  updateUserProfile,
  getUserPosts
};
