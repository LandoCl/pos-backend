import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  rol: {
    type: String,
    enum: ["admin", "cashier"],
    default: "cashier",
  },
});

export default mongoose.model("User", userSchema);
