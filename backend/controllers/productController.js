import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc     Get products (paginated)
//@route    GET /api/products/{page}
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
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

//@desc     Fetch all products
//@route    GET /api/products
//@access   Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc     Get product by Id
//@route    GET /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found.");
  }
});

export { getProducts, getProductById, getAllProducts };
