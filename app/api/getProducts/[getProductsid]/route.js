import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb"; 
import { getProduct } from "app/libs/models/Schema"

export async function GET(request, content){
    const getProductID = content.params.getProductsid;
    const record = {_id:getProductID}
    await mongoose.connect(connectionStr);
    const result = await getProduct.findById(record)

    return NextResponse.json({result, success:true})
}