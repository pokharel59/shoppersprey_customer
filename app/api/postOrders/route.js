import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb"; 
import { Order } from "@/app/libs/models/Schema";

export async function GET() {
    let data = []
        try {
            await mongoose.connect(connectionStr);
            data = await Order.find();
        } catch (error) {
            data = {success:false}        
        }
    return NextResponse.json({result: data, success:true });
}

export async function POST(request){
    const payload = await request.json();
    try {
        await mongoose.connect(connectionStr);
        let orderData = new Order(payload);
        const result = await orderData.save();
        return NextResponse.json({result, success:true})
    } catch (error) {
        console.error('Error saving order:', error);
        return NextResponse.json({success: false});
        
    }

}