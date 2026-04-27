import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Voucher from '@/models/Voucher';

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    
    if (!code) {
      return NextResponse.json({ message: 'Voucher code is required' }, { status: 400 });
    }

    // 1. Database Connection
    await connectToDatabase();
    const Reward = (await import('@/models/Reward')).default;

    const upperCode = code.toUpperCase();

    // 2. Try to find real Voucher in DB first
    const voucher = await Voucher.findOne({ code: upperCode })
      .populate('rewards');

    if (voucher) {
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
    }

    // 3. DEMO VOUCHER FALLBACK (if not found in DB)
    if (upperCode === 'DEMO2026' || upperCode === 'PGL300' || upperCode === 'PGL500' || upperCode === 'PGL1TR') {
      let mockRewards = [];
      
      if (upperCode === 'PGL300') {
        mockRewards = [
          { name: 'Tất cotton Pro Green Life', description: 'Chất liệu cotton cao cấp, thấm hút mồ hôi', image: '/rewards/socks.png' },
          { name: 'Bình nước thân thiện môi trường', description: 'Bình nhựa lúa mạch an toàn cho sức khỏe', image: '/rewards/binh-nuoc.jpg' }
        ];
      } else if (upperCode === 'PGL500') {
        mockRewards = [
          { name: 'Kem đánh răng thảo dược', description: 'Chiết xuất từ thiên nhiên, bảo vệ nướu', image: '/rewards/toothpaste.png' },
          { name: 'Dây sạc 3 đầu đa năng', description: 'Tương thích với mọi thiết bị di động', image: '/rewards/day-sac.jpg' }
        ];
      } else if (upperCode === 'PGL1TR') {
        mockRewards = [
          { name: 'Áo phông Velosar', description: 'Thiết kế thời trang, chất liệu thoáng mát', image: '/rewards/tshirt.png' },
          { name: 'Mũ lưỡi trai cao cấp', description: 'Kiểu dáng năng động, logo thêu tinh xảo', image: '/rewards/mu-luoi-trai.jpg' }
        ];
      } else {
        mockRewards = [
          { name: 'Premium Eco Bottle', description: 'Double-walled stainless steel', image: '/rewards/binh-nuoc.jpg' },
          { name: 'Green Tote Bag', description: 'Eco-friendly reusable bag', image: '/rewards/tote.png' }
        ];
      }

      // Fetch real stock for each mock reward using flexible regex matching
      const rewardsWithStock = await Promise.all(mockRewards.map(async (m) => {
        const dbReward = await Reward.findOne({
          $or: [
            { name: { $regex: new RegExp(m.name.split(' ')[0], 'i') } },
            { name: { $regex: new RegExp(m.name.replace(' phông', ''), 'i') } },
            { name: { $regex: new RegExp(m.name.replace(' cao cấp', ''), 'i') } },
            { name: m.name }
          ]
        });

        return {
          ...m,
          _id: dbReward?._id || `mock_${m.name}`,
          stock: dbReward ? dbReward.stock : 0
        };
      }));

      return NextResponse.json({
        valid: true,
        voucher: {
          code: upperCode,
          rewards: rewardsWithStock
        }
      });
    }

    return NextResponse.json({ message: 'Mã số thẻ không hợp lệ' }, { status: 404 });

  } catch (error: any) {
    console.error('Validate Voucher Error:', error);
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
