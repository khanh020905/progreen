import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Reward from '@/models/Reward';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    const rewards = await Reward.find().sort({ name: 1 });
    console.log(`Fetched ${rewards.length} rewards. First reward stock: ${rewards[0]?.stock}`);
    return NextResponse.json(rewards);
  } catch (error: any) {
    console.error('Fetch Rewards Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { name, description, image, isActive, stock } = await request.json();
    
    const reward = new Reward({
      name,
      description,
      image,
      isActive: isActive !== undefined ? isActive : true,
      stock: stock !== undefined ? stock : 100
    });

    await reward.save();
    return NextResponse.json(reward, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
