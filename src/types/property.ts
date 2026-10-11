export type PublicationPrecision = 'exact' | 'approximate' | 'municipality';
export interface PropertyFeature { id: string; title: string; description?: string; icon: 'cooking-pot'|'trees'|'thermometer'|'layers'|'car'|'house'|'sun'|'shield' }
export interface PropertyDetail { label: string; value: string | number | null; suffix?: string }
export interface Property {
 id: string; name: string; heroMediaId: string; heading: string; eyebrow: string; subtitle: string;
 type: string | null; transaction: 'sale' | 'rent'; description: string[];
 price: number | null; priceOnRequest: boolean; currency: string;
 country: string; region: string | null; municipality: string | null;
 street: string | null; postalCode: string | null; precision: PublicationPrecision;
 livingArea: number | null; plotArea: number | null; rooms: number | null;
 bedrooms: number | null; bathrooms: number | null; floors: number | null;
 parking: number | null; yearBuilt: number | null;
 condition: string | null; heating: string | null; energy: string | null;
 availability: string | null; status: 'available'|'reserved'|'sold'|'unknown';
 features: PropertyFeature[]; technicalDetails: PropertyDetail[];
 sections: Array<{ title: string; text: string; mediaId?: string }>;
 verified: boolean;
}
