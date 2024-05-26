import express from "express";
import formidable from "express-formidable";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  getProductPhotoController,
  getSingleProductController,
  deleteProductController,
  updateProductController,
  productFilterController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  braintreeTokenController,
  braintreePaymentController,
} from "./../controllers/productController.js";

const router = express.Router();

// Routes

// Create Product Routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Update Product Route
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

// Delete Product Route
router.delete("/delete-product/:pid", deleteProductController);

// Get all Product Routes
router.get("/get-product", getProductController);

// Get Singel Product Routes
router.get("/get-product/:slug", getSingleProductController);

// Get Photo
router.get("/product-photo/:pid", getProductPhotoController);

// Product Filter Routes
router.post("/product-filters", productFilterController);

// Product Count Routes
router.get("/product-count", productCountController);

// Product Per Page Routes
router.get("/product-list/:page", productListController);

// Search Product Routes
router.get("/search/:keyword", searchProductController);

// Similar Product Controller
router.get("/related-product/:pid/:cid", relatedProductController);

// Category wise Product
router.get(`/product-category/:slug`, productCategoryController);

// Payment Routes
// token
router.get("/braintree/token", braintreeTokenController);

// Payments
router.post("/braintree/payment", requireSignIn, braintreePaymentController);
export default router;
