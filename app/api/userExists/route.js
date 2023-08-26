import mongoose, { connect } from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb"; 
import Users from "@/app/libs/models/Schema"; 

export async function GET() {
    try {
        await mongoose.connect(connectionStr);
        const existingUser = await Users.findOne({}, 'email' );

        return NextResponse.json({ exists: existingUser });
    } catch (error) {
        console.error('Error checking user existence: ', error);
        return NextResponse.json({ exists: false });
    }
}