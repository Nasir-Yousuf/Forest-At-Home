import Order from "../models/Order.js";

// ─── Create Order ─────────────────────────────────────────────────────────────
export async function createOrder(req, res, next) {
  try {
    const { items, totalAmount, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain at least one item." });
    }
    if (!shippingAddress?.fullName || !shippingAddress?.address) {
      return res.status(400).json({ message: "Shipping address is required." });
    }

    const order = await Order.create({
      user: req.user?._id, // optional – guest friendly
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || "card",
    });

    res.status(201).json({
      status: "success",
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    next(err);
  }
}

// ─── Get My Orders ────────────────────────────────────────────────────────────
export async function getMyOrders(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Please log in to view your orders." });
    }
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ status: "success", results: orders.length, orders });
  } catch (err) {
    next(err);
  }
}

// ─── Get Single Order ─────────────────────────────────────────────────────────
export async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.json({ status: "success", order });
  } catch (err) {
    next(err);
  }
}

// ─── Get All Orders (Admin) ───────────────────────────────────────────────────
export async function getAllOrders(req, res, next) {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json({ status: "success", results: orders.length, orders });
  } catch (err) {
    next(err);
  }
}

// ─── Update Order Status (Admin) ──────────────────────────────────────────────
export async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.json({ status: "success", order });
  } catch (err) {
    next(err);
  }
}
