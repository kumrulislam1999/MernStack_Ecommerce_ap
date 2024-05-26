import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrderController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// Router Object
const router = express.Router();

// Routing
// Register || Method POST

router.post("/register", registerController);

// Login || Method POST
router.post("/login", loginController);

// Forgot Password || Method POST
router.post("/forgot-password", forgotPasswordController);

// Update Profile
router.put("/profile", requireSignIn, updateProfileController);

// Test Routes
router.get("/test", requireSignIn, isAdmin, testController);

// Protected User Auth Routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Admin Auth Routes
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Get Orders Route
router.get("/orders", requireSignIn, getOrderController);

// Get All Orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// Order Status Update Route
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
