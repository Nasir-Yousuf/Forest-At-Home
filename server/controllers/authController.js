import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ─── Helper: Sign JWT ────────────────────────────────────────────────────────
function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "90d",
  });
}

function sendToken(user, statusCode, res) {
  const token = signToken(user._id);
  // Scrub password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
}

// ─── Register ────────────────────────────────────────────────────────────────
export async function register(req, res, next) {
  try {
    const { name, email, password, phone, address, city, zip } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
      city,
      zip,
    });

    sendToken(user, 201, res);
  } catch (err) {
    // Handle mongoose validation errors
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(". ") });
    }
    next(err);
  }
}

// ─── Login ───────────────────────────────────────────────────────────────────
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
}

// ─── Get Current User (me) ───────────────────────────────────────────────────
export async function getMe(req, res) {
  res.json({ status: "success", user: req.user });
}
