import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const propertyType = searchParams.get('propertyType');
    const featured = searchParams.get('featured');
    const status = searchParams.get('status') || 'PUBLISHED';

    const where: any = {};

    if (category && category !== 'ALL') {
      where.category = category;
    }

    if (city && city !== 'ALL') {
      where.city = { contains: city };
    }

    if (propertyType && propertyType !== 'ALL') {
      where.propertyType = propertyType;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (status !== 'ALL') {
      where.status = status;
    }

    const opportunities = await db.opportunity.findMany({
      where,
      include: {
        builder: true,
        area: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formatted = opportunities.map((op) => ({
      ...op,
      images: typeof op.images === 'string' ? JSON.parse(op.images || '[]') : op.images,
      area: op.area ? {
        ...op.area,
        infraHighlights: typeof op.area.infraHighlights === 'string' ? JSON.parse(op.area.infraHighlights || '[]') : op.area.infraHighlights,
      } : null,
      builder: op.builder ? {
        ...op.builder,
        pastProjects: typeof op.builder.pastProjects === 'string' ? JSON.parse(op.builder.pastProjects || '[]') : op.builder.pastProjects,
      } : null,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json({ error: 'Failed to fetch opportunities' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      category,
      propertyType,
      city,
      country,
      priceBand,
      thesis,
      summary,
      images,
      status,
      featured,
      areaId,
      builderId,
    } = body;

    if (!title || !slug || !category || !priceBand || !thesis) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newOpportunity = await db.opportunity.create({
      data: {
        title,
        slug,
        category,
        propertyType: propertyType || 'RESIDENTIAL',
        city,
        country: country || 'India',
        priceBand,
        thesis,
        summary: summary || '',
        images: JSON.stringify(Array.isArray(images) ? images : []),
        status: status || 'PUBLISHED',
        featured: Boolean(featured),
        areaId: areaId || null,
        builderId: builderId || null,
      },
    });

    return NextResponse.json(newOpportunity, { status: 201 });
  } catch (error: any) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json({ error: error.message || 'Failed to create opportunity' }, { status: 500 });
  }
}
