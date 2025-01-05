import mongoose from "mongoose";

const connectDB = async function () {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.BD_NAME}`
    );
    console.log(
      `MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MONGODB Connection Failed ", error);
    process.exit(1);
  }
};

export default connectDB;
