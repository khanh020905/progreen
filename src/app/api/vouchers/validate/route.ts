import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Voucher from '@/models/Voucher';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    
    if (!code) {
      return NextResponse.json({ message: 'Voucher code is required' }, { status: 400 });
    }

    // 1. DEMO VOUCHER FALLBACK
    if (code.toUpperCase() === 'DEMO2026') {
      return NextResponse.json({
        valid: true,
        voucher: {
          code: 'DEMO2026',
          rewards: [
            { _id: 'r1', name: 'Premium Eco Bottle', description: 'Double-walled stainless steel', image: 'https://images.unsplash.com/photo-1602143399827-bd95968330b7?q=80&w=800' },
            { _id: 'r2', name: 'Green Tote Bag', description: 'Eco-friendly reusable bag', image: 'https://images.unsplash.com/photo-1544816153-16ad4614ff98?q=80&w=800' }
          ]
        }
      });
    }

    // 2. Database Connection
    await connectToDatabase();

    // 3. Find Voucher
    const voucher = await Voucher.findOne({ code: code.toUpperCase() })
      .populate('rewards');

    if (!voucher) {
      return NextResponse.json({ message: 'Mã số thẻ không hợp lệ' }, { status: 404 });
    }

    if (!voucher.isActive) {
      return NextResponse.json({ message: 'Mã số thẻ không hợp lệ' }, { status: 400 });
    }

    if (voucher.isRedeemed) {
      return NextResponse.json({ message: 'Rất tiếc, mã thẻ này đã được sử dụng' }, { status: 400 });
    }

    return NextResponse.json({
      valid: true,
      voucher: {
        code: voucher.code,
        rewards: voucher.rewards
      }
    });

  } catch (error: any) {
    console.error('Validate Voucher Error:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
