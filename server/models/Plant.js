import mongoose from "mongoose";

const plantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Plant name is required"],
      trim: true,
    },
    scientificName: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: [
        "indoor",
        "outdoor",
        "medicinal",
        "ornamental",
        "aquatic",
        "succulent",
      ],
      default: "indoor",
    },
    stock: {
      type: Number,
      default: 100,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    careLevel: {
      type: String,
      enum: ["easy", "moderate", "expert"],
      default: "easy",
    },
    region: {
      type: String,
      default: "Bangladesh",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Plant = mongoose.model("Plant", plantSchema);
export default Plant;
