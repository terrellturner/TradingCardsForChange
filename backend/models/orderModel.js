import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        bookings: {
          type: Array,
          required: true,
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true, default: "Guest" },
      addressSecondary: { type: String, required: true, default: "Guest" },
      city: { type: String, required: true, default: "Guest" },
      postalCode: { type: String, required: true, default: "Guest" },
      country: { type: String, required: true, default: "Guest" },
    },
    billingAddress: {
      address: { type: String, required: true, default: "Guest" },
      addressSecondary: { type: String, required: true, default: "Guest" },
      city: { type: String, required: true, default: "Guest" },
      postalCode: { type: String, required: true, default: "Guest" },
      country: { type: String, required: true, default: "Guest" },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Paypal",
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: false,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
