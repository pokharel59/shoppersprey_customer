import mongoose from 'mongoose';
import { connectionStr } from 'app/libs/mongodb';
import { Cart } from '@/app/libs/models/Schema';
import { NextResponse } from 'next/server';

export async function GET() {
    let data = []
    try {
        await mongoose.connect(connectionStr)
        data = await Cart.find();
    } catch (error) {
        data={success:false}
    }

return NextResponse.json({ result: data, success:true});
}
