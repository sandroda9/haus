export type GalleryVariant = 'alle'|'modern'|'familie'|'aktuell';
export type MediaVariant = Exclude<GalleryVariant,'alle'>|'shared';
export type MediaArea = 'aussenbereich'|'innenbereich'|'kueche'|'unterbau'|'grundrisse';
export type GalleryArea = MediaArea | 'alle-bereiche';
export type GalleryState = { variant: GalleryVariant; area: GalleryArea };
export type MediaKind = 'photo'|'visualization'|'floorplan';
export interface PropertyMedia {
 id: string; src: string; thumbnailSrc?: string; srcSet?:string; sizes?:string; title: string; alt: string;
 description?: string; kind: MediaKind; variant: MediaVariant;
 areas: MediaArea[]; roomId?: string; floorId?: string;
 sortOrder?: number; isVerifiedOriginal: boolean; isVerifiedPlan?: boolean; published: boolean;
 width: number; height: number;
}
