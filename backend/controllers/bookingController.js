import asyncHandler from "../middleware/asyncHandler.js";
import Booking from "../models/bookingModel.js";
import mongoose from "mongoose";

//@desc     Create new booking
//@route    POST /api/bookings
//@access   Private, Admin
const createNewBooking = asyncHandler(async (req, res) => {
  try {
    const booking = new Booking({
      product: req.body.product,
      reservationSeats: req.body.reservationSeats,
      bookingDate: req.body.bookingDate,
      status: req.body.status,
      user: req.body.user,
      order: req.body.order,
    });
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//@desc     Get bookings per event
//@route    GET /api/bookings/
//@access   Protected, Admin
const getBookingsPerEvent = asyncHandler(async (req, res) => {
  const { productId, eventStartTime } = req.query;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ message: `Invalid Product ID: ${productId}` });
  }
  const parsedBookingDate = new Date(eventStartTime);

  try {
    const bookings = await Booking.aggregate([
      {
        $match: {
          product: new mongoose.Types.ObjectId(productId),
          bookingDate: parsedBookingDate,
        },
      },
      {
        $group: {
          _id: null,
          totalReservations: { $sum: "$reservationSeats" },
        },
      },
    ]);

    const totalReservations =
      bookings.length > 0 ? bookings[0].totalReservations : 0;
    res.json({
      productId,
      date: parsedBookingDate.toISOString(),
      totalReservations,
    });
    console.log(
      `Total of ${totalReservations} for ${productId} at ${parsedBookingDate}.`
    );
  } catch (error) {
    throw new Error(
      `Resource not found for event: ${productId} at ${parsedBookingDate}. ${error.message}`
    );
  }
});

//@desc     Update booking
//@route    POST /api/bookings/:id
//@access   Private, Admin
const updateBooking = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.name = req.body.status || booking.status;
    try {
      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(404);
    throw new Error("Resource not found.");
  }
});

export { createNewBooking, getBookingsPerEvent, updateBooking };
