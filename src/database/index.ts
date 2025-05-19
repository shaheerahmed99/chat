import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const dbURI = process.env.MONGO_DB_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {});
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
