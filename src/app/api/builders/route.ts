import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const builders = await db.builder.findMany({
      include: {
        opportunities: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    const formatted = builders.map((b) => ({
      ...b,
      pastProjects: typeof b.pastProjects === 'string' ? JSON.parse(b.pastProjects || '[]') : b.pastProjects,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching builders:', error);
    return NextResponse.json({ error: 'Failed to fetch builders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, slug, history, trackRecord, logo, pastProjects } = body;

    const newBuilder = await db.builder.create({
      data: {
        name,
        slug,
        history: history || '',
        trackRecord: trackRecord || '',
        logo: logo || null,
        pastProjects: JSON.stringify(Array.isArray(pastProjects) ? pastProjects : []),
      },
    });

    return NextResponse.json(newBuilder, { status: 201 });
  } catch (error: any) {
    console.error('Error creating builder:', error);
    return NextResponse.json({ error: error.message || 'Failed to create builder' }, { status: 500 });
  }
}
