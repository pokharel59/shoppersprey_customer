import mongoose, { connect } from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb"; 
import Users from "@/app/libs/models/Schema"; // Make sure to import the Users model correctly

export async function POST(request){
        const payload = await request.json();
        try {
                await mongoose.connect(connectionStr);
                let userData = new Users(payload);
                const result = await userData.save();
                return NextResponse.json({result, success:true})
        } catch (error) {
                console.error('Error saving user:', error);
                return NextResponse.json({success: false});
        }
}


