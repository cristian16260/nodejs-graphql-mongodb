import mongoose from "mongoose";

const mongodb = () => {
  mongoose.connect(
    "mongodb+srv://cmrcristian26:passwordmongo98@cluster0.wwavevr.mongodb.net/test"
  );
  console.log("Connected to MongoDB");
};

export default mongodb;
