import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const areas = await db.area.findMany({
      include: {
        opportunities: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    const formatted = areas.map((a) => ({
      ...a,
      infraHighlights: typeof a.infraHighlights === 'string' ? JSON.parse(a.infraHighlights || '[]') : a.infraHighlights,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching areas:', error);
    return NextResponse.json({ error: 'Failed to fetch areas' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, overview, infraHighlights, priceTrendNotes } = body;

    const newArea = await db.area.create({
      data: {
        name,
        slug,
        overview: overview || '',
        infraHighlights: JSON.stringify(Array.isArray(infraHighlights) ? infraHighlights : []),
        priceTrendNotes: priceTrendNotes || '',
      },
    });

    return NextResponse.json(newArea, { status: 201 });
  } catch (error: any) {
    console.error('Error creating area:', error);
    return NextResponse.json({ error: error.message || 'Failed to create area' }, { status: 500 });
  }
}
