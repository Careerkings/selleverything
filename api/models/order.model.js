import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    paymentIntentId: { type: String },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: { type: String },
        price: { type: Number },
        cartQuantity: { type: Number },
        image: { type: String },
        description: { type: String },
      },
    ],
    totalAmount: { type: Number, required: true },
    currency: { type: String },
    payment_status: {
      type: String,
      enum: ["paid", "unpaid", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
