import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnect = () => {
  const MONGO_DB_URL = process.env.MONGO_DB_URL;
  if (!MONGO_DB_URL) {
    console.error("MONGO_DB_URL is not defined in the environment variables.");
    process.exit(1);
  }
  mongoose
    .connect(MONGO_DB_URL)
    .then((response) => {
      console.log("MongoDB Connection Succeeded.");
    })
    .catch((error) => {
      console.log("Error in DB connection: " + error);
    });
};

export default dbConnect;
