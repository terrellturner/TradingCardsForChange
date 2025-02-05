import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//@desc    Auth user, get tokens
//@route    POST /api/users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (
    (user && (await user.matchPassword(password))) ||
    user.passwordChangePrompt === true
  ) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      requiresPasswordReset: user.passwordChangePrompt,
    });
  } else {
    res.status(401);
    throw new Error(
      "Error! Invalid email or password. Check your credentials and try again."
    );
  }
});

//@desc    Register user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error(
      "Another user is already registered with this email address."
    );
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    throw new Error("Invalid user data. Please try again.");
  }
});

//@desc     Logout user, clear cookie
//@route    POST /api/users/logout
//@access   Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User was logged out successfully." });
});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found, changes not made.");
  }
});

//@desc     Get users
//@route    GET /api/users
//@access   Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const sortField = req.query.sortField || "_id";
  const sortOrder = req.query.sortOrder || "asc";

  const count = await User.countDocuments({});

  const sortObj = { [sortField]: sortOrder === "asc" ? 1 : -1 };

  const users = await User.find({})
    .sort(sortObj)
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

//@desc     Get user by id
//@route    GET /api/users/:id
//@access   Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

//@desc     Delete user
//@route    DELETE /api/users/:id
//@access   Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin users...");
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully." });
  } else {
    res.status(404);
    throw new Error("User not found!");
  }
});

//@desc     Update users
//@route    PUT /api/users/:id
//@access   Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }
});

//@desc Force user to update their password
//@route PUT /api/users/reset-password
//@access Private
const resetPassword = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;

    console.log(userId);

    const user = await User.findById(userId);

    user.passwordChangePrompt = true;
    await user.save();

    res.json({ message: "User updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
});

//@desc Update password
//@route PUT /api/users/change-password
//@access Private
const updatePassword = asyncHandler(async (req, res) => {
  try {
    const { newPw } = req.body;
    const user = await User.findById(req.user._id);

    if (user.passwordChangePrompt === false) {
      console.log(user);
      return res.status(400).json({
        message:
          "ERROR: You have not been cleared for password reset! Initiate reset via your profile or contact an administrator.",
      });
    }

    //Password hashed in userModel before
    //being saved to db.
    user.password = newPw;
    user.passwordChangePrompt = false;
    await user.save();

    res.json({ message: "Password successfully updated." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error!" });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  resetPassword,
  updatePassword,
};
