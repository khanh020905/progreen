import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Claim from '@/models/Claim';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const { status } = await request.json();

    const oldClaim = await Claim.findById(id);
    if (!oldClaim) {
      return NextResponse.json({ message: 'Claim not found' }, { status: 404 });
    }

    const claim = await Claim.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    // If status changed to Confirmed, decrement stock
    if (status === 'Confirmed' && oldClaim.status !== 'Confirmed' && claim?.rewardId) {
      try {
        const reward = await Reward.findById(claim.rewardId);
        if (reward) {
          reward.stock = Math.max(0, (reward.stock || 0) - 1);
          if (!reward.stockHistory) reward.stockHistory = [];
          reward.stockHistory.push({
            date: new Date(),
            change: -1,
            reason: `Claim Confirmed (Ref: ${claim.claimReference})`,
            type: 'automatic'
          });
          await reward.save();
        }
      } catch (error) {
        console.error('Failed to decrement stock:', error);
        // We continue because the claim update was successful
      }
    }

    return NextResponse.json(claim);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
