import { connect, connection } from "mongoose";

const connectDB = async (uri: string) => {
  try {
    await connect(uri);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const clearDatabase = async () => {
  try {
    await connection.dropDatabase();
    console.log("Database cleared successfully.");
  } catch (error) {
    console.error(`Error clearing database: ${error.message}`);
  }
};

const closeDatabase = async () => {
  try {
    await connection.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error(`Error closing database connection: ${error.message}`);
  }
};

export { connectDB, clearDatabase, closeDatabase };
