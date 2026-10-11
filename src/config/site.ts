import {property} from '../data/property';
export type SiteMode = 'demo' | 'production';
export const site = {
  mode: ((import.meta.env?.SITE_MODE ?? process.env.SITE_MODE) || 'demo') as SiteMode,
  name: property.name,
  tagline: 'Raum für ein neues Kapitel',
  language: 'de-CH',
  locale: 'de-CH',
  currency: 'CHF',
  publicUrl: (import.meta.env?.PUBLIC_SITE_URL ?? process.env.PUBLIC_SITE_URL)?.trim() || null,
  company: { name: null as string | null, street: null as string | null, city: null as string | null, phone: null as string | null, email: null as string | null },
  areaLabels: { unterbau: 'Unterbau' },
} as const;
export const isDemo = site.mode !== 'production';
