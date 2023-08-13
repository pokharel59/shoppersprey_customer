import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb"; // Fix the variable name here
import { getProduct } from "app/libs/models/getProduct"

export async function GET() {

  let data = []
      try {
        await mongoose.connect(connectionStr);
        data = await getProduct.find();
      } catch (error) {
        data={success:false}
      }
  
  return NextResponse.json({ result: data, success:true });
}