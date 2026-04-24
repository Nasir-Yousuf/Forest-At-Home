import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
    const { name, email, password, phone, address, city, zip, gps } = req.body;

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
      gps,
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

// ─── Google Login ────────────────────────────────────────────────────────────
export async function googleLogin(req, res, next) {
  try {
    const { idToken, accessToken } = req.body;
    let email, name, picture, googleId;

    if (idToken) {
      const ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      email = payload.email;
      name = payload.name;
      picture = payload.picture;
      googleId = payload.sub;
    } else if (accessToken) {
      // Fetch user info from Google's userinfo endpoint
      const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
      const data = await response.json();
      if (!response.ok) throw new Error("Failed to fetch Google profile");
      
      email = data.email;
      name = data.name;
      picture = data.picture;
      googleId = data.sub;
    } else {
      return res.status(400).json({ message: "No Google token provided." });
    }

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if they don't exist
      user = await User.create({
        name,
        email,
        googleId,
        image: picture,
      });
    } else if (!user.googleId) {
      // If user exists but was registered via email, link the accounts
      user.googleId = googleId;
      if (!user.image) user.image = picture;
      await user.save({ validateBeforeSave: false });
    }

    sendToken(user, 200, res);
  } catch (err) {
    console.error("Google Auth Error:", err);
    res.status(401).json({ message: "Google authentication failed." });
  }
}
