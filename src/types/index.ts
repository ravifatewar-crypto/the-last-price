export type OpportunityCategory = 'NEW' | 'RE_INVESTMENT' | 'MISSED';
export type PropertyType = 'RESIDENTIAL' | 'COMMERCIAL';
export type OpportunityStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface AreaItem {
  id: string;
  name: string;
  slug: string;
  overview: string;
  infraHighlights: string[];
  priceTrendNotes: string;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

export interface BuilderItem {
  id: string;
  name: string;
  slug: string;
  history: string;
  trackRecord: string;
  logo?: string | null;
  pastProjects: string[];
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

export interface OpportunityItem {
  id: string;
  title: string;
  slug: string;
  category: OpportunityCategory;
  propertyType: PropertyType;
  city: string;
  country: string;
  priceBand: string;
  thesis: string;
  summary: string;
  images: string[];
  status: OpportunityStatus;
  featured: boolean;
  areaId?: string | null;
  builderId?: string | null;
  area?: AreaItem | null;
  builder?: BuilderItem | null;
  createdAt?: Date | string | null;
  updatedAt?: Date | string | null;
}

export interface FilterState {
  category: string;
  city: string;
  propertyType: string;
  search: string;
}
