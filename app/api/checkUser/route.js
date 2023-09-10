// import mongoose, { connect } from "mongoose";
// import { NextResponse } from "next/server";
// import { connectionStr } from "app/libs/mongodb";
// import { Users } from "@/app/libs/models/Schema";

// export async function GET(request) {
//   const payload = await request.json();
//   let data = []
//   try {
//     await mongoose.connect(connectionStr);
//     data = await Users.findOne({ email: payload.email});
//     if(!data){
//         alert("User doesnot exist. Please signin first");
//         router.push("/signupPage")
//     }
//   } catch (error) {
//     data = { success: false }
//   }
//   return NextResponse.json({ result: data, success: true });
// }