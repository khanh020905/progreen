import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Voucher from '@/models/Voucher';
import Claim from '@/models/Claim';

export async function GET() {
  try {
    await connectToDatabase();

    const [totalVouchers, redeemedVouchers, pendingClaims, completedClaims] = await Promise.all([
      Voucher.countDocuments(),
      Voucher.countDocuments({ isRedeemed: true }),
      Claim.countDocuments({ status: 'Pending' }),
      Claim.countDocuments({ status: 'Completed' })
    ]);

    return NextResponse.json({
      totalVouchers,
      redeemedVouchers,
      pendingClaims,
      completedClaims
    });
  } catch (error: any) {
    console.error('Stats Error:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
