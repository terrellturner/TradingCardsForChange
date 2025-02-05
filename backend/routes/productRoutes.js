import express from "express";
import {
  getProducts,
  getProductById,
  getAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/all").get(getAllProducts);
router.route("/:id").get(getProductById);

export default router;
