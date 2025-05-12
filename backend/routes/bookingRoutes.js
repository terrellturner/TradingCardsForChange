import express from "express";
import {
  createNewBooking,
  getBookingsPerEvent,
  updateBooking,
} from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getBookingsPerEvent).post(protect, createNewBooking);
router
  .route("/:eventId")

  .put(protect, updateBooking);

export default router;
