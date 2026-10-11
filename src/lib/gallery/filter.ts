import type { GalleryState,PropertyMedia } from '../../types/media';
export const defaultState: GalleryState = {variant:'alle',area:'alle-bereiche'};
export function mediaForState(items: readonly PropertyMedia[], state: GalleryState): PropertyMedia[] {
 return items.filter(item => item.published &&
  (state.variant === 'alle' || item.variant === state.variant || item.variant === 'shared') &&
  (state.variant === 'alle' || state.area === 'alle-bereiche' || item.areas.includes(state.area)))
 .sort((a,b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999) || a.id.localeCompare(b.id));
}
export function mediaLabel(item:PropertyMedia): string {
 if (item.kind === 'floorplan') return item.isVerifiedPlan?'Grundriss – freigegebene Planunterlage':'Schematischer Demo-Grundriss – kein realer Bauplan';
 if (item.variant === 'aktuell' && item.isVerifiedOriginal) return 'Aktueller Zustand – Originalaufnahme';
 return 'Einrichtungsbeispiel – digitale Visualisierung';
}
