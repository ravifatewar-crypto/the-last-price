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

  // Fetch opportunities
  const ops = await db.opportunity.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true },
  });

  const opRoutes = ops.map((op) => ({
    url: `${baseUrl}/opportunities/${op.slug}`,
    lastModified: op.updatedAt.toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Fetch builders
  const builders = await db.builder.findMany({
    select: { slug: true, updatedAt: true },
  });

  const builderRoutes = builders.map((b) => ({
    url: `${baseUrl}/builders/${b.slug}`,
    lastModified: b.updatedAt.toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Fetch areas
  const areas = await db.area.findMany({
    select: { slug: true, updatedAt: true },
  });

  const areaRoutes = areas.map((a) => ({
    url: `${baseUrl}/areas/${a.slug}`,
    lastModified: a.updatedAt.toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...opRoutes, ...builderRoutes, ...areaRoutes];
}
