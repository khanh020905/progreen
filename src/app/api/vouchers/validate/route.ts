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
    const upperCode = code.toUpperCase();
    
    if (upperCode === 'DEMO2026' || upperCode === 'PGL300' || upperCode === 'PGL500' || upperCode === 'PGL1TR') {
      let rewards = [];
      
      if (upperCode === 'PGL300') {
        rewards = [
          { _id: 'r300_1', name: 'Tất cotton Pro Green Life', description: 'Chất liệu cotton cao cấp, thấm hút mồ hôi', image: '/rewards/socks.png', stock: 100 },
          { _id: 'r300_2', name: 'Bình nước thân thiện môi trường', description: 'Bình nhựa lúa mạch an toàn cho sức khỏe', image: '/rewards/binh-nuoc.jpg', stock: 100 }
        ];
      } else if (upperCode === 'PGL500') {
        rewards = [
          { _id: 'r500_1', name: 'Kem đánh răng thảo dược', description: 'Chiết xuất từ thiên nhiên, bảo vệ nướu', image: '/rewards/toothpaste.png', stock: 100 },
          { _id: 'r500_2', name: 'Dây sạc 3 đầu đa năng', description: 'Tương thích với mọi thiết bị di động', image: '/rewards/day-sac.jpg', stock: 100 }
        ];
      } else if (upperCode === 'PGL1TR') {
        rewards = [
          { _id: 'r1000_1', name: 'Áo phông Velosar', description: 'Thiết kế thời trang, chất liệu thoáng mát', image: '/rewards/tshirt.png', stock: 100 },
          { _id: 'r1000_2', name: 'Mũ lưỡi trai cao cấp', description: 'Kiểu dáng năng động, logo thêu tinh xảo', image: '/rewards/mu-luoi-trai.jpg', stock: 100 }
        ];
      } else {
        // DEMO2026
        rewards = [
          { _id: 'r1', name: 'Premium Eco Bottle', description: 'Double-walled stainless steel', image: '/rewards/binh-nuoc.jpg', stock: 100 },
          { _id: 'r2', name: 'Green Tote Bag', description: 'Eco-friendly reusable bag', image: '/rewards/tote.png', stock: 100 }
        ];
      }

      return NextResponse.json({
        valid: true,
        voucher: {
          code: upperCode,
          rewards: rewards
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
