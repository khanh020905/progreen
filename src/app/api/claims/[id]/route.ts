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

    const claim = await Claim.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!claim) {
      return NextResponse.json({ message: 'Claim not found' }, { status: 404 });
    }

    return NextResponse.json(claim);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
