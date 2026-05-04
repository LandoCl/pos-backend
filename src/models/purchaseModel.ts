import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
  products: [
    {
      product_id: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      subtotal: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Purchase", purchaseSchema);
