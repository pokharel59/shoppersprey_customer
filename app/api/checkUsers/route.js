import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb";
import { Users } from "@/app/libs/models/Schema";

export async function POST(request) {
  const payload = await request.json();

  try {
    await mongoose.connect(connectionStr);

    // Check if a user with the provided email exists
    const existingUser = await Users.findOne({ email: payload.email });

    if (!existingUser) {
      return NextResponse.json({ message: 'User not found', success: false }, { status: 401 });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(payload.password, existingUser.password);

    if (passwordMatch) {
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid password', success: false }, { status: 401 });
    }

  } catch (error) {
    console.error('Error authenticating user:', error);
    return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
  }
}
