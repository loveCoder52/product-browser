import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME
        });
        console.log(`Database connected successfully ${connectionInstance.connection.host}`);
        console.log(`Database name ${connectionInstance.connection.name}`);
    } catch (error) {
        console.log(`Database connection error ${error}`);
        process.exit(1);
    }
}

export default connectDB;