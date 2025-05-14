import express from "express";
import {
  getProducts,
  getProductById,
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import checkObjectId from "../middleware/checkObjectId.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createNewProduct);
router.route("/all").get(getAllProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

export default router;
