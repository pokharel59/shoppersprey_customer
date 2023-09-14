import mongoose, { mongo } from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb";
import  {Users}  from "@/app/libs/models/Schema";
import bcrypt from "bcrypt";


export async function GET(request) {
  let data = []

  try {
    await mongoose.connect(connectionStr);
    const data = await Users.find();
  } catch (error) {
    data = { success: false }
  }

  return NextResponse.json({ result: user, success: true });
}

export async function POST(request) {
  const payload = await request.json();

  try {
    await mongoose.connect(connectionStr);

    // Check if a user with the provided email already exists
    const existingUser = await Users.findOne({ email: payload.email});

    if (existingUser) {
      return NextResponse.json({ message: 'User already exists', success: false }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);
    const userData = new Users({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      address: payload.address,
      city: payload.city,
      phoneNumber: payload.phoneNumber,
    });

    const result = await userData.save();
    console.log("Account created");

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
  }
}





