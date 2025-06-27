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
      if (req.user) {
        next();
      } else {
        console.error("No user found for token");
        res.status(401);
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("FULL ERROR DETAILS:", error);
      console.error("Error Name:", error.name);
      console.error("Error Message:", error.message);

      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }
    }
  } else {
    res.status(401);
    throw new Error(
      "Unauthorized access! No token. Contact your administrator."
    );
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error(
      "Error! Not authorized as admin. Attempt has been logged for security purposes."
    );
  }
};

export { protect, admin };
