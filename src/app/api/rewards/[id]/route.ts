import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Reward from '@/models/Reward';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();
    
    const reward = await Reward.findByIdAndUpdate(id, body, { new: true });
    if (!reward) {
      return NextResponse.json({ message: 'Reward not found' }, { status: 404 });
    }
    
    return NextResponse.json(reward);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    const reward = await Reward.findByIdAndDelete(id);
    if (!reward) {
      return NextResponse.json({ message: 'Reward not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Reward deleted' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
