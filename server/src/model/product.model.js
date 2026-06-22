import mongoose from "mongoose";

const CATEGORIES = ["Electronics", "Clothing", "Books", "Food", "Sports", "Toys"];

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
      maxLength: [120, "Product name should not be more than 120 characters"],
    },
    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: {
        values: CATEGORIES,
        message: "Invalid category",
      },
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
      min: [1, "Price must be at least 1"],
      max: [999999, "Price should not exceed 999999"],
    },
  },
  { timestamps: true }  // auto creates createdAt and updatedAt ✅
);

// ✅ Index for fast pagination (newest first)
productSchema.index({ createdAt: -1 });

// ✅ Index for category filter + pagination combined
productSchema.index({ category: 1, createdAt: -1 });

export const PRODUCT_CATEGORIES = CATEGORIES;
const Product = mongoose.model("Product", productSchema);
export default Product;