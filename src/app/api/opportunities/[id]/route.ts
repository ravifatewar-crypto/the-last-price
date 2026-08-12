import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    const updateData: any = { ...body };
    if (body.images && Array.isArray(body.images)) {
      updateData.images = JSON.stringify(body.images);
    }

    const updated = await db.opportunity.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error('Error updating opportunity:', error);
    return NextResponse.json({ error: error.message || 'Failed to update opportunity' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await db.opportunity.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting opportunity:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete opportunity' }, { status: 500 });
  }
}
