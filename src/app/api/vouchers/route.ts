import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Voucher from '@/models/Voucher';

export async function GET() {
  try {
    await connectToDatabase();
    const vouchers = await Voucher.find().populate('rewards').sort({ createdAt: -1 });
    return NextResponse.json(vouchers);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { code, rewards, isActive } = await request.json();
    
    const existing = await Voucher.findOne({ code: code.toUpperCase() });
    if (existing) {
      return NextResponse.json({ message: 'Voucher code already exists' }, { status: 400 });
    }

    const voucher = new Voucher({
      code: code.toUpperCase(),
      rewards,
      isActive: isActive !== undefined ? isActive : true
    });

    await voucher.save();
    return NextResponse.json(voucher, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
