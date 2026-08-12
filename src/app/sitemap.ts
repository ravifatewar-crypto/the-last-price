import { MetadataRoute } from 'next';
import { db } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thelastprice.in';

  // Static routes
  const staticRoutes = [
    '',
    '/opportunities',
    '/builders',
    '/areas',
    '/market-intelligence',
    '/calculators',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  let opRoutes: any[] = [];
  let builderRoutes: any[] = [];
  let areaRoutes: any[] = [];

  try {
    const ops = await db.opportunity.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
    });

    opRoutes = ops.map((op) => ({
      url: `${baseUrl}/opportunities/${op.slug}`,
      lastModified: op.updatedAt ? op.updatedAt.toISOString() : new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

    const builders = await db.builder.findMany({
      select: { slug: true, updatedAt: true },
    });

    builderRoutes = builders.map((b) => ({
      url: `${baseUrl}/builders/${b.slug}`,
      lastModified: b.updatedAt ? b.updatedAt.toISOString() : new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const areas = await db.area.findMany({
      select: { slug: true, updatedAt: true },
    });

    areaRoutes = areas.map((a) => ({
      url: `${baseUrl}/areas/${a.slug}`,
      lastModified: a.updatedAt ? a.updatedAt.toISOString() : new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));
  } catch (err) {
    console.error('Error generating sitemap dynamic routes:', err);
  }

  return [...staticRoutes, ...opRoutes, ...builderRoutes, ...areaRoutes];
}
