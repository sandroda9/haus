import type {GalleryState,GalleryVariant,GalleryArea} from '../../types/media';
import {defaultState} from './filter';
const validVariants = new Set<GalleryVariant>(['alle','modern','familie','aktuell']);
const validAreas = new Set<GalleryArea>(['alle-bereiche','aussenbereich','innenbereich','kueche','unterbau','grundrisse']);
export function parseGalleryState(params:URLSearchParams): GalleryState {
 const variantParam = params.get('variante') as GalleryVariant | null;
 const areaParam = params.get('bereich') as GalleryArea | null;
 const variant = variantParam && validVariants.has(variantParam) ? variantParam : defaultState.variant;
 return { variant, area: variant !== 'alle' && areaParam && validAreas.has(areaParam) ? areaParam : 'alle-bereiche' };
}
export function galleryQuery(state:GalleryState):string {
 if(state.variant === 'alle') return '';
 const p = new URLSearchParams({variante:state.variant});
 if(state.area !== 'alle-bereiche') p.set('bereich',state.area);
 return `?${p.toString()}`;
}
