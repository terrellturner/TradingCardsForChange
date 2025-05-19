import Product from "../models/productModel.js";
import mongoose from "mongoose";
import { calcPrices } from "../utils/calcPrices.js";
import { verifyPayPalPayment, checkIfNewTransaction } from "../utils/paypal.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

//@desc     Create new order
//@route    POST request to /api/orders
//@access   Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, billingAddress, paymentMethod } =
    req.body;

  if (!Array.isArray(orderItems) && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );

      if (!matchingItemFromDB) {
        res.status(404);
        throw new Error("Product not found");
      }

      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: matchingItemFromDB.price,
        eventLocation: matchingItemFromDB.eventLocation,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user?._id,
      shippingAddress,
      billingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    console.log(dbOrderItems);

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//@desc     Get logged in user orders
//@route    GET request to /api/orders/my_orders
//@access   Private
const getCurrentUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json(orders);
});

//@desc     Get order by ID
//@route    GET request to /api/orders/:id
//@access   Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found!");
  }
});

//@desc     Update order as paid
//@route    PUT request to /api/orders/:id/pay
//@access   Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const { verified, value } = await verifyPayPalPayment(req.body.id);
  if (!verified) throw new Error("Payment not verified");

  // check if this transaction has been used before
  const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  if (!isNewTransaction) throw new Error("Transaction has been used before");

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    const paidCorrectAmount = order.totalPrice.toString() === value;
    if (!paidCorrectAmount) throw new Error("Incorrect amount paid");

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc     Update as delivered
//@route    PUT request to /api/orders/:id/deliver
//@access   Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Error! Order not found.");
  }
});

//@desc     Get all orders
//@route    GET request to /api/orders
//@access   Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const sortField = req.query.sortField || "_id";
  const sortOrder = req.query.sortOrder || "asc";

  const count = await Order.countDocuments({});

  const sortObj = { [sortField]: sortOrder === "asc" ? 1 : -1 };

  const orders = await Order.find({})
    .sort(sortObj)
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ orders, page, pages: Math.ceil(count / pageSize) });
});

export {
  addOrderItems,
  getCurrentUserOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
