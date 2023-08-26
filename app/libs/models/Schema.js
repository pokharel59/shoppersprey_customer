import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  name:String,
  price:String,
  description:String,
  category:String
});
export const getProduct =mongoose.models.products || mongoose.model("products", productModel);

const orderModel = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  paid: { type: Boolean, default: false },
  recipient: { type: String, required: true },
  products: { type: String, required: true },
});

export const Order = mongoose.models.orders || mongoose.model("orders", orderModel);

const featureSchema = new mongoose.Schema({
  title: String,
  description: String,
});

export const featuresDetail = mongoose.models.features || mongoose.model("features", featureSchema);

