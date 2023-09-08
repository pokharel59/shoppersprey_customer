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
  paid: { type: String, required: true },
  recipient: { type: String, required: true },
  name: { type: String, required: true },
  price: {type: String, required: true},
  quantity: { type: Number, reqired: true},
  orderStatus: { type: String, required: true }
});

export const Order = mongoose.models.orders || mongoose.model("orders", orderModel);

const featureSchema = new mongoose.Schema({
  title: String,
  description: String,
});

export const featuresDetail = mongoose.models.features || mongoose.model("features", featureSchema);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: String,
  city: String,
  phoneNumber: {type: Number, required: true}
},
);

export const Users = mongoose.models.users || mongoose.model("users", userSchema);


