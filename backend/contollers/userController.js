const asyncHandler = require("express-async-handler");
const User = require("../modals/useModel");

const authUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth user" });
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
  if(user){
  res.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email
  })
  } else {
    res.status(400);
    throw new Error('Inavlid user data');
  }
});


const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "logout user" });
});

const getuserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "getuserprofile user" });
}); //@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "updateProfile user" });
}); //@access.private

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getuserProfile,
  updateUserProfile,
};
