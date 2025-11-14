import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    googleID: { type: String, required: false, unique: true, sparse: true },
    First_name: { type: String, required: true, trim: true, min: 2 },
    Last_name: { type: String, required: true, trim: true, min: 2 },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      match: /^[^s@]+@[^s@]+.[^s@]+$/,
    },
    password: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      min: 8,
      max: 30,
    },
    avatar: {
      type: String,
      // default: // Use it Later
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
