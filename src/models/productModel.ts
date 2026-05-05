import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  sale_price: {
    type: Number,
    required: true,
  },
  purchase_price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  min_stock: {
    type: Number,
    required: true,
  },
  units: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
