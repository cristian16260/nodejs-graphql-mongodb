import { model, Schema } from "mongoose";

const userschema = new Schema(
  {
    username: {
      type: String,
      required: [true, "is required"],
    },
    password: {
      type: String,
      required: [true, "is required"],
      select: false,
    },
    email: {
      type: String,
      required: [true, "is required"],
      unique: true,
      match: [
        /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,
        "email invalid",
      ],
    },
    displayname: {
      type: String,
      required: [true, "is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Users = model("User", userschema);
