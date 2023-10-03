import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { connectionStr } from "app/libs/mongodb";
import { Users } from "@/app/libs/models/Schema";
import jwt from "jsonwebtoken";

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

      const token = jwt.sign(
        { user_id: existingUser._id, name: existingUser.name, email: existingUser.email},
        process.env.TOKEN_KEY,
        { expiresIn: '1000h'}
        );

      return NextResponse.json({ token, success: true}, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid password', success: false }, { status: 401 });
    }

  } catch (error) {
    console.error('Error authenticating user:', error);
    return NextResponse.json({ message: 'Internal server error', success: false }, { status: 500 });
  }
}
