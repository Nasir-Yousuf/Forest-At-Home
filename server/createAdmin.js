import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const mongoUrl = process.env.MONGO_URL;

async function createAdmin() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUrl);
    console.log("Connected successfully.");

    const adminEmail = process.env.EMAIL_ADDRESS || "admin@forestatcode.com";
    const adminPassword = process.env.PASSWORD || "adminpassword123";

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(
        `Admin user already exists! Email: ${adminEmail}, Password: ${adminPassword}`,
      );
      process.exit(0);
    }

    // Create a new admin user
    const admin = new User({
      name: "Nasir Yousuf",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
      phone: "018**********",
    });

    await admin.save();
    console.log("✅ Admin user created successfully!");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating admin user:", error.message);
    process.exit(1);
  }
}

createAdmin();
