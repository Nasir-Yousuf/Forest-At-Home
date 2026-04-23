import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Full auth check (throws 401 if not logged in)
export async function protect(req, res, next) {
  try {
    let token;
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      token = auth.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "Please log in to access this route." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "The user belonging to this token no longer exists." });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token. Please log in again." });
  }
}

// Optional auth – attaches user if token present, but never blocks the request
export async function optionalAuth(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      const token = auth.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user) req.user = user;
    }
  } catch {
    // ignore – unauthenticated requests are fine
  }
  next();
}

// Admin check
export function isAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
}
