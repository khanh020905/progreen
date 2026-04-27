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

    const historyEntry = {
      date: new Date(),
      change,
      reason: reason || 'Manual Update',
      type: 'manual' as const
    };

    const updatedReward = await Reward.findOneAndUpdate(
      { _id: id },
      { 
        $set: { stock: quantity },
        $push: { stockHistory: historyEntry }
      },
      { new: true, runValidators: true }
    );

    if (!updatedReward) return NextResponse.json({ message: 'Update failed' }, { status: 500 });

    console.log(`Stock updated for ${id}: ${updatedReward.stock} (Change: ${change})`);
    return NextResponse.json(updatedReward);
  } catch (error: any) {
    console.error('Stock Update Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
