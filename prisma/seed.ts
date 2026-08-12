import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding The Last Price database...');

  // Clean existing tables
  await prisma.opportunity.deleteMany({});
  await prisma.builder.deleteMany({});
  await prisma.area.deleteMany({});
  await prisma.adminUser.deleteMany({});

  // Seed Admin User
  await prisma.adminUser.create({
    data: {
      email: 'admin@thelastprice.in',
      password: 'adminpassword123', // Demo auth
    },
  });

  // Seed Builders
  const yugen = await prisma.builder.create({
    data: {
      name: 'Yugen Infra',
      slug: 'yugen-infra',
      history: 'Founded by industry veterans, Yugen Infra specializes in ultra-luxury boutique developments and managed vacation estates across India\'s prime destination markets.',
      trackRecord: '100% on-time delivery across 1.2M sq.ft. of luxury residential developments.',
      logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&q=80',
      pastProjects: JSON.stringify([
        'Yugen Horizon Villas - North Goa',
        'Yugen Pine Retreat - Kasauli',
        'Yugen Urban Lofts - Gurugram'
      ]),
    },
  });

  const bnw = await prisma.builder.create({
    data: {
      name: 'BNW Developer',
      slug: 'bnw-developer',
      history: 'BNW Developer is a premier Dubai-based real estate developer renowned for landmark waterfront towers and high-yield luxury residential assets across the UAE.',
      trackRecord: 'Delivered 8 landmark towers in Business Bay, Maritime City, and Jumeirah Village Circle.',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&q=80',
      pastProjects: JSON.stringify([
        'BNW Vista Towers - Business Bay',
        'BNW Marina Heights - Dubai Maritime City',
        'BNW Oasis Residence - JVC Dubai'
      ]),
    },
  });

  const ncrDev = await prisma.builder.create({
    data: {
      name: 'VVIP Group & Apex Realty',
      slug: 'vvip-apex-realty',
      history: 'Over 25 years of excellence in Delhi NCR real estate, developing Grade-A commercial centers and premium high-rise townships in Noida and Ghaziabad.',
      trackRecord: 'Delivered over 12M sq.ft. with 15,000+ satisfied homeowners and commercial occupants.',
      logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=300&q=80',
      pastProjects: JSON.stringify([
        'VVIP Address - Raj Nagar Extension',
        'Apex Golf Avenue - Greater Noida West',
        'VVIP Style Commercial Hub - Ghaziabad'
      ]),
    },
  });

  // Seed Areas
  const rneArea = await prisma.area.create({
    data: {
      name: 'Raj Nagar Extension',
      slug: 'raj-nagar-extension',
      overview: 'Raj Nagar Extension (RNE) is Ghaziabad\'s most strategically positioned micro-market, directly connected to Delhi via the 6-lane elevated highway and Namo Bharat RRTS corridor.',
      infraHighlights: JSON.stringify([
        'Direct 15-minute access to Anand Vihar ISBT via Hindon Elevated Road',
        'Operational Namo Bharat RRTS Ghaziabad Station',
        'Upcoming International Cricket Stadium complex',
        'Proximity to Eastern Peripheral Expressway'
      ]),
      priceTrendNotes: '5-year CAGR of 11.4%. Projected short-term appreciation of 14-18% post RRTS phase II link.',
    },
  });

  const noidaExtArea = await prisma.area.create({
    data: {
      name: 'Noida Extension (Greater Noida West)',
      slug: 'noida-extension',
      overview: 'One of Delhi NCR\'s fastest-growing residential and commercial corridors, benefiting from massive infrastructure investments and proximity to Noida Sector 62 IT hub.',
      infraHighlights: JSON.stringify([
        'Proposed Metro Line expansion from Sector 51 to Knowledge Park V',
        'FNG Expressway connectivity',
        'Jewar Noida International Airport catchment (40 mins direct drive)',
        'Established retail centers and top international schools'
      ]),
      priceTrendNotes: 'Commercial rental yields range between 7.2% and 8.8%. Capital appreciation grew 38% between 2021 and 2024.',
    },
  });

  const goaArea = await prisma.area.create({
    data: {
      name: 'North Goa (MOPA Airport Belt)',
      slug: 'north-goa-mopa',
      overview: 'North Goa\'s luxury estate corridor anchored by the newly operational Manohar International Airport (MOPA), attracting high-net-worth investors seeking vacation rental income.',
      infraHighlights: JSON.stringify([
        'Manohar International Airport (MOPA) operational with international flights',
        'New 6-lane highway connecting MOPA to coastal belt (Morjim/Candolim)',
        'Surging demand for managed luxury pool villas',
        'Strict CRZ guidelines limiting future villa supply'
      ]),
      priceTrendNotes: 'Average holiday home gross yields of 8.5% - 10.5%. Villa land values up 65% in 3 years.',
    },
  });

  const dubaiArea = await prisma.area.create({
    data: {
      name: 'Business Bay & Maritime City',
      slug: 'dubai-business-bay-maritime',
      overview: 'Dubai\'s core commercial and waterfront residential corridor, situated adjacent to Downtown Dubai, Burj Khalifa, and the Dubai Water Canal.',
      infraHighlights: JSON.stringify([
        'Zero Income Tax & Zero Capital Gains Tax environment',
        '10-Year UAE Golden Visa eligibility for property investments > AED 2M',
        'Direct access to Sheikh Zayed Road and Dubai International Airport',
        'High international tourist and expat executive tenant pool'
      ]),
      priceTrendNotes: 'Average rental yields of 6.8% - 8.2% in USD terms. Capital growth of 18.5% year-on-year across prime waterfront sectors.',
    },
  });

  // Seed Opportunities
  await prisma.opportunity.create({
    data: {
      title: 'Raj Nagar Extension Growth Corridor',
      slug: 'ghaziabad-raj-nagar-extension',
      category: 'NEW',
      propertyType: 'RESIDENTIAL',
      city: 'Ghaziabad',
      country: 'India',
      priceBand: '₹65L – 1.2Cr',
      thesis: 'Capitalizing on the Hindon Elevated Road and rapid regional rail connectivity (RRTS), offering high capital growth potential before full corridor stabilization.',
      summary: `### Executive Investment Summary
Raj Nagar Extension (RNE) represents one of the most compelling value-to-infrastructure arbitrage plays in Delhi NCR. Positioned directly at the junction of the Hindon Elevated Road and the Delhi-Meerut RRTS corridor, RNE provides seamless sub-20 minute transit to Central Delhi and Anand Vihar.

### Financial Metrics & Projections
- **Entry Price Band**: ₹65L – 1.2Cr (₹4,800 – ₹6,200 per sq.ft.)
- **Projected Rental Yield**: 5.2% – 6.1% per annum
- **3-Year Target Appreciation**: 28% – 35%
- **Underwriting Risk Level**: Low-to-Moderate (Established infrastructure, registered developer land bank)

### Infrastructure Catalysts
1. **Delhi-Meerut Namo Bharat RRTS**: Reduces commute times to Delhi IT nodes to under 20 minutes.
2. **Hindon Airport Domestic Terminal Expansion**: Commercial flights expanding regional business travel.
3. **Institutional Ecosystem**: Operational DPS, GD Goenka, and hospital networks supporting resident retention.

### Research Conclusion
We recommend allocation in RNE for investors seeking strong capital growth combined with steady cash flow yield. Early entry before the completion of commercial retail phase III is advised.`,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
      ]),
      status: 'PUBLISHED',
      featured: true,
      areaId: rneArea.id,
      builderId: ncrDev.id,
    },
  });

  await prisma.opportunity.create({
    data: {
      title: 'Noida Extension Mid-Rise Commercial Hub',
      slug: 'noida-extension-growth-corridor',
      category: 'RE_INVESTMENT',
      propertyType: 'COMMERCIAL',
      city: 'Noida',
      country: 'India',
      priceBand: '₹1.1Cr – 2.4Cr',
      thesis: 'A prime re-investment opportunity for investors holding NCR residential assets to pivot into high-footfall commercial retail and Grade-A office units.',
      summary: `### Re-Investment Strategy & Portfolio Rebalancing
For investors holding capital gains from earlier residential runs in Noida Sector 75-78, Greater Noida West commercial real estate offers an ideal yield expansion play. With residential density exceeding 120,000 households within a 3km radius, commercial supply remains underserved.

### Financial Metrics & Projections
- **Entry Price Band**: ₹1.1Cr – 2.4Cr
- **Current Lease Yield**: 7.5% – 8.8% gross yield with 9-year lease structures
- **Tenant Profile**: Tier-1 QSR brands, banks, medical centers, and national retail chains
- **Underwriting Risk Level**: Low (Pre-leased units available with immediate cash flow)

### Key Value Drivers
- **Catchment Density**: Over 300,000 residents living in immediate adjacent high-rise societies.
- **Jewar Airport Corridor**: Positioned along the primary transit highway connecting Delhi to the upcoming Jewar International Airport.
- **Escalation Clause**: Built-in 15% rent escalation every 3 years.`,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80'
      ]),
      status: 'PUBLISHED',
      featured: true,
      areaId: noidaExtArea.id,
      builderId: ncrDev.id,
    },
  });

  await prisma.opportunity.create({
    data: {
      title: 'Yugen Infra Luxury Villas & Serviced Estates',
      slug: 'goa-yugen-infra-villas',
      category: 'NEW',
      propertyType: 'RESIDENTIAL',
      city: 'Goa',
      country: 'India',
      priceBand: '₹3.5Cr – 5.8Cr',
      thesis: 'High-yield holiday villa investment benefiting from MOPA airport expansion and year-round vacation rental demand with managed hospitality operations by Yugen Infra.',
      summary: `### Executive Overview
North Goa has transitioned from a seasonal tourist market into a year-round premium living and luxury vacation destination. Yugen Infra's managed villa collection combines private luxury living with fully managed hospitality operations.

### Financial Metrics & Yield Structure
- **Entry Price Band**: ₹3.5Cr – 5.8Cr
- **Managed Gross Rental Yield**: 8.5% – 10.2% per annum via high-occupancy boutique pool villa rentals
- **5-Year Capital Growth Expectation**: 40% – 50%
- **Underwriting Risk Level**: Moderate (High ADR market with limited supply of licensed luxury villas)

### Unique Value Proposition
- **Turnkey Property Management**: Full hospitality management handling guest check-ins, maintenance, marketing, and yield optimization.
- **MOPA International Airport Proximity**: 25-minute drive from the new airport terminal.
- **Private Plunge Pools & Architecture**: Sustainable Balinese-modern architectural design with private gardens.`,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80'
      ]),
      status: 'PUBLISHED',
      featured: true,
      areaId: goaArea.id,
      builderId: yugen.id,
    },
  });

  await prisma.opportunity.create({
    data: {
      title: 'BNW Developer Waterfront Tower',
      slug: 'dubai-bnw-business-bay',
      category: 'NEW',
      propertyType: 'RESIDENTIAL',
      city: 'Dubai',
      country: 'UAE',
      priceBand: 'AED 1.4M – 2.8M (~₹3.1Cr – 6.3Cr)',
      thesis: 'Tax-free international capital appreciation and strong USD-pegged rental yields in Business Bay & Dubai Maritime City by BNW Developer.',
      summary: `### International Diversification Note
For high-net-worth investors seeking currency hedge against INR depreciation, Dubai real estate offers USD-pegged asset allocation with 0% personal tax on rental income and capital gains.

### Financial Metrics & Projections
- **Entry Price Band**: AED 1.4M – 2.8M (~₹3.1Cr – 6.3Cr)
- **Net Rental Yield**: 6.8% – 7.8% in USD terms
- **Payment Structure**: 60/40 flexible payment plan linked to construction milestones
- **Golden Visa Qualification**: 10-Year renewable residency for investments of AED 2M+

### Location & Developer Strengths
- Positioned directly on the Dubai Water Canal in Business Bay, 5 minutes from Downtown Dubai and Dubai Mall.
- BNW Developer's track record of 100% on-schedule project completion in UAE.`,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
        'https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=1200&q=80'
      ]),
      status: 'PUBLISHED',
      featured: true,
      areaId: dubaiArea.id,
      builderId: bnw.id,
    },
  });

  await prisma.opportunity.create({
    data: {
      title: 'Sector 137 Noida Expressway Residential',
      slug: 'noida-sector-137-proof-point',
      category: 'MISSED',
      propertyType: 'RESIDENTIAL',
      city: 'Noida',
      country: 'India',
      priceBand: '₹75L → ₹1.65Cr (+120% Realized Growth)',
      thesis: 'Featured in 2021 as an early-stage metro corridor play. Delivered 120% capital appreciation over 36 months, proving our infrastructure-first selection framework.',
      summary: `### Retrospective Research Audit (Past Proof Point)
This opportunity was highlighted in our 2021 early research note when Sector 137 was priced at ₹4,200/sq.ft. prior to full commercial maturity of the Noida-Greater Noida Aqua Line Metro and corporate IT park completions.

### Historical Performance Realized
- **Initial Research Price (2021)**: ₹75 Lakhs (3 BHK)
- **Current Market Valuation (2024)**: ₹1.65 Crore
- **Realized Return**: +120% Capital Growth (+ 5.4% annual rental yield throughout holding period)
- **Key Takeaway**: Verifies our thesis that early-stage transit nodes combined with Grade-A developer delivery outperform general market averages by 2.4x.`,
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
        'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80'
      ]),
      status: 'PUBLISHED',
      featured: true,
      areaId: noidaExtArea.id,
      builderId: ncrDev.id,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
