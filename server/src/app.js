import express from "express"
import cors from "cors"
import productRoutes from "./routes/product.routes.js";

const app = express();

// ✅ CORS — frontend connect kar sake
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
}));

app.use(express.json());

// ✅ Health check route
app.get("/", (req, res) => {
    res.json({ message: "API is working 🚀" })
})

app.use("/api/products", productRoutes);

export default app;