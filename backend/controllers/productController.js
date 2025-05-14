import asyncHandler from "../middleware/asyncHandler.js";
import mongoose from "mongoose";
import Product from "../models/productModel.js";
import pkg from "rrule";
const { RRule, Weekday } = pkg;

//@desc     Get products (paginated)
//@route    GET /api/products/{page}
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT || 10;
  const page = Number(req.query.pageNumber) || 1;
  const sortField = req.query.sortField || "_id";
  const sortOrder = req.query.sortOrder || "asc";

  const count = await Product.countDocuments({});

  const sortObj = { [sortField]: sortOrder === "asc" ? 1 : -1 };

  const products = await Product.find({})
    .sort(sortObj)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc     Fetch All Products
//@route    GET /api/products/all
//@access   Public
const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const now = new Date();

    const events = await Product.find({ type: "event" });

    let occurrences = [];

    for (const event of events) {
      if (event.startTime) {
        const start = new Date(event.startTime.valueOf());
        const end = event.endTime ? new Date(event.endTime.valueOf()) : null;

        occurrences.push({
          _id: event._id.toString(),
          title: event.name,
          startTime: new Date(event.startTime.valueOf()),
          endTime: new Date(event.endTime.valueOf()),
          allDay: false,
          eventLocation: event.eventLocation || "Default",
          countInStock: event.countInStock,
          maximumEventCapacity: event.maximumEventCapacity,
          image: event.image,
          description: event.description,
          isRecurring: event.isRecurring,
          recurringPattern: event.recurringPattern,
          rrule: event.rrule,
        });
      }
    }
    occurrences.sort((a, b) => a.start - b.start);
    res.status(200).json(occurrences);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//@desc     Get product by Id
//@route    GET /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found.");
  }
});

//@desc     Create new product
//@route    POST /api/products
//@access   Private, Admin
const createNewProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    ...req.body,
    user: req.user._id,
  });

  const newProduct = await product.save();
  res.status(201).json(newProduct);
});

//@desc     Update product
//@route    POST /api/products/
//@access   Private, Admin
const updateProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.cardSet = req.body.cardSet || product.cardSet;
    product.category = req.body.category || product.category;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.eventLocation = req.body.eventLocation || product.eventLocation;
    product.type = req.body.type || product.type;
    product.isArchived = req.body.isArchived || product.isArchived;
    product.isRecurring = req.body.isRecurring || product.isRecurring;

    if (req.body.startTime) {
      product.startTime = new Date(req.body.startTime);
    }
    if (req.body.endTime) {
      product.endTime = new Date(req.body.endTime);
    }

    if (req.body.excludedDates) {
      product.excludedDates = [
        ...product.excludedDates,
        ...req.body.excludedDates,
      ];
    }

    console.log(req.body.recurringPattern);

    if (req.body.recurringPattern) {
      const { recurringInterval, endDate } = req.body.recurringPattern;
      product.recurringPattern.customOccurrenceConfig =
        req.body.recurringPattern.customOccurrenceConfig || {};

      product.recurringPattern.recurringInterval = recurringInterval;
      product.recurringPattern.endDate = endDate;
    } else {
      product.rrule = undefined;
      product.recurringPattern = {};
    }

    try {
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(404);
    throw new Error("Resource not found.");
  }
});

//@desc     Delete product
//@route    DELETE /api/products/:id
//@access   Private, Admin
const deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: "Product deleted." });
  } else {
    res.status(404);
    throw new Error("Resource not found!");
  }
});

export {
  getProducts,
  getProductById,
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
