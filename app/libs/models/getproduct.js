import mongoose from "mongoose";

const productModel = new mongoose.Schema({
  name:String,
  price:String,
  description:String,
  category:String
});
export const getProduct =mongoose.models.products || mongoose.model("products", productModel);
