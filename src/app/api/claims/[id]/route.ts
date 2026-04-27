import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Claim from '@/models/Claim';
import Reward from '@/models/Reward';
import mongoose from 'mongoose';

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
    if (status === 'Confirmed' && oldClaim.status !== 'Confirmed') {
      try {
        let reward = null;
        
        // Try to find by ID first if it's a valid ObjectId
        if (claim?.rewardId && mongoose.Types.ObjectId.isValid(claim.rewardId)) {
          reward = await Reward.findById(claim.rewardId);
        }
        
        // Fallback: try to find by Name (important for demo vouchers)
        if (!reward && claim?.rewardName) {
          reward = await Reward.findOne({ 
            name: { $regex: new RegExp(claim.rewardName.split(' ')[0], 'i') } 
          }).or([
            { name: { $regex: new RegExp(claim.rewardName.replace(' phông', ''), 'i') } },
            { name: { $regex: new RegExp(claim.rewardName.replace(' cao cấp', ''), 'i') } },
            { name: claim.rewardName }
          ]);
        }

        if (reward) {
          reward.stock = Math.max(0, (reward.stock || 0) - 1);
          if (!reward.stockHistory) reward.stockHistory = [];
          reward.stockHistory.push({
            date: new Date(),
            change: -1,
            reason: `Claim Confirmed (Ref: ${claim.claimReference})`,
            type: 'automatic'
          });
          
          reward.markModified('stock');
          reward.markModified('stockHistory');
          await reward.save();
          console.log(`Stock decremented for ${reward.name}. New stock: ${reward.stock}`);
        }
      } catch (error) {
        console.error('Failed to decrement stock:', error);
      }
    }

    return NextResponse.json(claim);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
