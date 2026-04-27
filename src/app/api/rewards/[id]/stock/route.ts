import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Reward from '@/models/Reward';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { quantity, reason } = await request.json();

    const reward = await Reward.findById(id);
    if (!reward) return NextResponse.json({ message: 'Reward not found' }, { status: 404 });

    const currentStock = reward.stock || 0;
    const change = quantity - currentStock;
    
    reward.stock = quantity;
    if (!reward.stockHistory) reward.stockHistory = [];
    
    reward.stockHistory.push({
      date: new Date(),
      change,
      reason: reason || 'Manual Update',
      type: 'manual'
    });

    await reward.save();
    return NextResponse.json(reward);
  } catch (error: any) {
    console.error('Stock Update Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
