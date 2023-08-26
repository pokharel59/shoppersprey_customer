import mongoose, { mongo } from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb";
import { featuresDetail } from "@/app/libs/models/Schema";

export async function GET(request, content){
    const featureID = content.params.getFeaturesid;
    const record = {_id:featureID}
    await mongoose.connect(connectionStr);
    const result = await featuresDetail.findById(record)

    return NextResponse.json({result, success:true})
}