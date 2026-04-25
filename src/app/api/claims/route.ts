import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Claim from '@/models/Claim';
import Voucher from '@/models/Voucher';
import Reward from '@/models/Reward';

export async function GET() {
  try {
    await connectToDatabase();
    const claims = await Claim.find().sort({ createdAt: -1 });
    return NextResponse.json(claims);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { 
      voucherCode, 
      rewardId, 
      customerName, 
      phone, 
      email, 
      address, 
      provinceCity, 
      notes 
    } = await request.json();

    // 1. DEMO CLAIM FALLBACK
    if (voucherCode?.toUpperCase() === 'DEMO2026') {
       return NextResponse.json({
         success: true,
         claimReference: `PGL-DEMO-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
         message: 'Claim submitted successfully (DEMO MODE)'
       }, { status: 201 });
    }

    // 2. Database Connection
    await connectToDatabase();

    // 3. Validate Voucher
    const voucher = await Voucher.findOne({ code: voucherCode.toUpperCase() });
    if (!voucher || !voucher.isActive || voucher.isRedeemed) {
      return NextResponse.json({ message: 'Voucher is invalid or already redeemed' }, { status: 400 });
    }

    // 4. Validate Reward
    const reward = await Reward.findById(rewardId);
    if (!reward) {
      return NextResponse.json({ message: 'Selected reward not found' }, { status: 400 });
    }

    const claimReference = `PGL-${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

    // 5. Create Claim
    const claim = new Claim({
      voucherCode: voucher.code,
      rewardName: reward.name,
      rewardId: reward._id,
      customerName,
      phone,
      email,
      address,
      provinceCity,
      notes,
      claimReference
    });

    await claim.save();

    // 6. Mark voucher as redeemed
    voucher.isRedeemed = true;
    voucher.redeemedAt = new Date();
    await voucher.save();

    return NextResponse.json({
      success: true,
      claimReference,
      message: 'Claim submitted successfully'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Submit Claim Error:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
