// dbConfig.ts
import mongoose from "mongoose";

let isConnected = false; // Global variable to track connection

export async function connect() {
  if (isConnected) {
    return; // Prevent multiple connections
  }

  const DB = process.env.DATABASE_URI?.replace(
    "<PASSWORD>",
    process.env.DATABASE_PASSWORD!
  );

  if (!DB) {
    throw new Error("Database URI or password is not defined in env variables");
  }

  try {
    const db = await mongoose.connect(DB);

    isConnected = !!db.connections[0].readyState;

    console.log("✅ MongoDB connected:", db.connection.host);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Could not connect to the database");
  }
}
