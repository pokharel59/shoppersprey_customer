import mongoose from "mongoose";
import { connectionStr } from "app/libs/mongodb";
import { Cart } from "@/app/libs/models/Schema";
import { NextResponse } from "next/server";

export async function POST(request) {
  const payload = await request.json();

  try {
    await mongoose.connect(connectionStr);

    let cart = await Cart.findOne({ user_id: payload.user_id });

    if (!cart) {
      cart = new Cart({
        user_id: payload.user_id,
        product_ids: [payload.product_id],
      });
    } else {
        cart.product_ids = cart.product_ids.concat(payload.product_ids);
    }

    await cart.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding to cart: ', error);
    return NextResponse.json({ success: false });
  }
}


