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
          { name: 'Set 3 đôi tất thể thao', description: 'chất cotton cao cấp, thấm hút mồ hôi', image: '/rewards/new-sock/z7784889641726_db0599a60ae270e4fc1bb50d5b196f25.jpg' },
          { name: 'Bình đựng nước thể thao', description: 'Bình nhựa lúa mạch an toàn cho sức khỏe', image: '/rewards/new-water-bottle/z7784889641728_d918a4f4a06858487d8b33f8cce40f8a.jpg' }
        ];
      } else if (upperCode === 'PGL500') {
        mockRewards = [
          { name: 'Kem đánh răng Close up 100gr', description: 'Bảo vệ khoang miệng, mang lại hơi thở thơm mát và hàm răng chắc khỏe', image: '/rewards/toothpaste.png' },
          { name: 'Dây sạc 3 đầu đa năng', description: 'Tương thích với mọi thiết bị di động', image: '/rewards/day-sac.jpg' }
        ];
      } else if (upperCode === 'PGL1TR') {
        mockRewards = [
          { name: 'Áo Velosar', description: 'Áo thể thao Nam/Nữ đa năng nhẹ nhàng, thoáng khí nhanh khô, thoải mái', image: '/rewards/new-shirt/female/z7784889640199_756c04b5a92bd3aed069659453487c93.jpg' },
          { name: 'Mũ Procumin-E', description: 'Mũ lưỡi trai Procumin-E. Quà tặng độc quyền của Pro Green Life', image: '/rewards/mu.jpg' }
        ];
      } else {
        mockRewards = [
          { name: 'Premium Eco Bottle', description: 'Double-walled stainless steel', image: '/rewards/new-water-bottle/z7784889641728_d918a4f4a06858487d8b33f8cce40f8a.jpg' },
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
