import dotenv from "dotenv"

// ✅ Sabse pehle dotenv load karo
dotenv.config({
    path: "./.env"
})

import app from "./app.js";
import connectDB from "./config/index.js";

const port = process.env.PORT || 5000;

connectDB().then(() => {
    // ✅ Pehle DB connect ho, phir server start ho
    app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
    })
}).catch((error) => {
    console.log(`❌ DB connection failed: ${error}`);
    process.exit(1);
})