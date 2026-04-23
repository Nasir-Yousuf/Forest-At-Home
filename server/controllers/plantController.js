import Plant from "../models/Plant.js";

// Get all plants
export async function getPlants(req, res, next) {
  try {
    const plants = await Plant.find({ isAvailable: true }).sort({ createdAt: -1 });
    res.json({ status: "success", results: plants.length, plants });
  } catch (err) {
    next(err);
  }
}

// Get single plant
export async function getPlant(req, res, next) {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.json({ status: "success", plant });
  } catch (err) {
    next(err);
  }
}

// Create new plant (Admin only)
export async function createPlant(req, res, next) {
  try {
    const { name, scientificName, price, isFree, description, image, category, stock, careLevel, region } = req.body;
    
    // Ensure if it's free, price is 0
    const finalPrice = isFree ? 0 : price;

    const plant = await Plant.create({
      name,
      scientificName,
      price: finalPrice,
      isFree,
      description,
      image,
      category,
      stock,
      careLevel,
      region,
      createdBy: req.user._id
    });

    res.status(201).json({ status: "success", plant });
  } catch (err) {
    next(err);
  }
}

// Update plant (Admin only)
export async function updatePlant(req, res, next) {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.json({ status: "success", plant });
  } catch (err) {
    next(err);
  }
}

// Delete plant (Admin only)
export async function deletePlant(req, res, next) {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) return res.status(404).json({ message: "Plant not found" });
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    next(err);
  }
}
