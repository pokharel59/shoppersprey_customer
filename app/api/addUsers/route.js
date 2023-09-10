import mongoose, { connect } from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb";
import { Users } from "@/app/libs/models/Schema";
import bcrypt from "bcrypt";
import { useRouter } from "next/navigation";

export async function GET(request) {
  const { email } = request.query;

  try {
    const user = await Users.findOne({ email });

    if (user) {
      return NextResponse.text("User already exists", { status: 409 }); // 409 Conflict
    }

    return NextResponse.text("Email available");
  } catch (error) {
    console.error("Error checking email:", error);
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
    console.log("Account created");

    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}




