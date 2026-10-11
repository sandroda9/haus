import type { GalleryVariant,GalleryArea } from '../types/media';
import { site } from './site';
export const variants: {value:GalleryVariant;label:string}[] = [
 {value:'alle',label:'Alle'}, {value:'modern',label:'Wohnidee: Modern'},
 {value:'familie',label:'Wohnidee: Familie'}, {value:'aktuell',label:'Aktuell'}
];
export const areas: {value:GalleryArea;label:string}[] = [
 {value:'alle-bereiche',label:'Alle Bereiche'},
 {value:'aussenbereich',label:'Aussenbereich'}, {value:'innenbereich',label:'Innenbereich'},
 {value:'kueche',label:'Küche'}, {value:'unterbau',label:site.areaLabels.unterbau},
 {value:'grundrisse',label:'Grundrisse'}
];
