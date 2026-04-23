import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrder,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, optionalAuth, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Guest-friendly order creation (optionalAuth enriches req.user if logged in)
router.post("/", optionalAuth, createOrder);

// Authenticated routes
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrder);

// Admin routes
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

export default router;
