import mongoose from "mongoose";

export const connectDb = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("mongodb connected");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1)
    // above line means if the process fails no need to check agin exit it 
    // process.exit(1) means there is error
    // process.exit(0) means everything is fine
  }
};
