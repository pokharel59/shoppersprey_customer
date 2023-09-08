import mongoose, { connect } from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb"; 
import {Users} from "@/app/libs/models/Schema";
import bcrypt from "bcrypt";


export async function GET(request) {
  const { email } = request.query;

  try {
    await mongoose.connect(connectionStr);
    
    // Log the email being searched
    console.log("Searching for email:", email);

    const user = await Users.findOne({ email });

    // Log the user document found
    console.log("User found:", user);

    if (user) {
      return NextResponse.json({ success: true, exists: true });
    } else {
      return NextResponse.json({ success: true, exists: false });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
      
      export async function POST(request) {
        const payload = await request.json();
        try {
          await mongoose.connect(connectionStr);
          const hashedPassword = await bcrypt.hash(payload.password, 10);
          let userData = new Users({
            name: payload.name,
            email: payload.email,
            password: hashedPassword,
            address: payload.address,
            city: payload.city,
            phoneNumber: payload.phoneNumber,
          });
          const result = await userData.save();
          return NextResponse.json({ result, success: true });
        } catch (error) {
          console.error('Error saving user:', error);
          return NextResponse.json({ success: false }, { status: 500 });
        }
      }
      


