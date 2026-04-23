import express from "express";
import { getPlants, getPlant, createPlant, updatePlant, deletePlant } from "../controllers/plantController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPlants);
router.get("/:id", getPlant);

// Admin only routes
router.post("/", protect, isAdmin, createPlant);
router.put("/:id", protect, isAdmin, updatePlant);
router.delete("/:id", protect, isAdmin, deletePlant);

export default router;
