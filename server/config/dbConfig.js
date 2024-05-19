import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MongoDB_URI
    );

    if (connection) {
      console.log(`Connected to MongoDB: ${connection.host}`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDB;
