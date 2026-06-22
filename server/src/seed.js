import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import Product, { PRODUCT_CATEGORIES } from "./model/product.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await Product.deleteMany();
    console.log("🗑️  Cleared existing products");

    const TOTAL = 200_000;
    const BATCH = 10_000;

    for (let i = 0; i < TOTAL; i += BATCH) {
      const products = [];

      for (let j = 0; j < BATCH; j++) {
        products.push({
          name: faker.commerce.productName(),
          category:
            PRODUCT_CATEGORIES[
              Math.floor(Math.random() * PRODUCT_CATEGORIES.length)
            ],
          price: parseFloat(faker.commerce.price({ min: 1, max: 999999 })),
        });
      }

      await Product.insertMany(products);
      console.log(`📦 Inserted ${i + BATCH} / ${TOTAL} products`);
    }

    console.log("🎉 Seeding complete!");
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seed();