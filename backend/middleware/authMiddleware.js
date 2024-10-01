import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      throw new Error(
        "Unauthorized access! Token failed. Contact your administrator.",
      );
    }
  } else {
    res.status(401);
    throw new Error(
      "Unauthorized access! No token. Contact your administrator.",
    );
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error(
      "Error! Not authorized as admin. Attempt has been logged for security purposes.",
    );
  }
};

export { protect, admin };
