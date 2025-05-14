import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  updatePassword,
  resetPassword,
} from "../controllers/userController.js";
import { rateLimit } from "express-rate-limit";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: "Alright, pal... way too many requests. Try again in 15 minutes.",
});

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/logout", logoutUser);
router.post("/auth", limiter, authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/change-password").put(protect, updatePassword);
router.route("/reset-password").put(protect, resetPassword);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(getUserById)
  .put(protect, admin, updateUser);

export default router;
