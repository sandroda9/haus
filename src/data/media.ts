import type { PropertyMedia } from '../types/media';
import { withBase } from '../lib/paths';
const common = { width: 1600, height: 1050, published: true, isVerifiedOriginal: false };
export const media: PropertyMedia[] = [
  { ...common, id:'modern-aussen', src:withBase('/images/modern-aussen.svg'), title:'Architekturkonzept · Aussenansicht', alt:'Stilisierte architektonische Darstellung eines modernen Hauses; kein Foto', kind:'visualization',variant:'modern',areas:['aussenbereich'],sortOrder:1 },
  { ...common, id:'modern-wohnen', src:withBase('/images/modern-wohnen.svg'), title:'Wohnidee Modern · Wohnraum', alt:'Konzeptionelle Illustration eines modern eingerichteten Wohnraums', kind:'visualization',variant:'modern',areas:['innenbereich'],roomId:'wohnen',sortOrder:2 },
  { ...common, id:'modern-kueche', src:withBase('/images/modern-kueche.svg'),title:'Wohnidee Modern · Küche',alt:'Konzeptionelle Illustration einer Küche mit Insel',kind:'visualization',variant:'modern',areas:['innenbereich','kueche'],roomId:'kueche',sortOrder:3 },
  { ...common, id:'modern-detail',src:withBase('/images/modern-detail.svg'),title:'Wohnidee Modern · Materialität',alt:'Stilisierte Materialien und Einrichtungselemente',kind:'visualization',variant:'modern',areas:['innenbereich'],sortOrder:4 },
  { ...common, id:'modern-unterbau',src:withBase('/images/modern-unterbau.svg'),title:'Wohnidee Modern · Unterbau',alt:'Konzeptionelle Illustration eines flexiblen Nebenraums',kind:'visualization',variant:'modern',areas:['unterbau','innenbereich'],sortOrder:5 },
  { ...common, id:'familie-aussen',src:withBase('/images/familie-aussen.svg'),title:'Wohnidee Familie · Aussenansicht',alt:'Stilisierte Architekturansicht mit Garten',kind:'visualization',variant:'familie',areas:['aussenbereich'],sortOrder:11 },
  { ...common, id:'familie-wohnen',src:withBase('/images/familie-wohnen.svg'),title:'Wohnidee Familie · Wohnraum',alt:'Konzeptionelle Illustration eines wohnlichen Familienbereichs',kind:'visualization',variant:'familie',areas:['innenbereich'],roomId:'wohnen',sortOrder:12 },
  { ...common, id:'familie-kueche',src:withBase('/images/familie-kueche.svg'),title:'Wohnidee Familie · Küche',alt:'Konzeptionelle Illustration einer familienfreundlichen Küche',kind:'visualization',variant:'familie',areas:['innenbereich','kueche'],roomId:'kueche',sortOrder:13 },
  { ...common, id:'familie-zimmer',src:withBase('/images/familie-zimmer.svg'),title:'Wohnidee Familie · Zimmer',alt:'Konzeptionelle Illustration eines gemütlichen Zimmers',kind:'visualization',variant:'familie',areas:['innenbereich'],sortOrder:14 },
  { ...common, id:'familie-unterbau',src:withBase('/images/familie-unterbau.svg'),title:'Wohnidee Familie · Unterbau',alt:'Konzeptionelle Illustration eines flexibel genutzten Nebenraums',kind:'visualization',variant:'familie',areas:['unterbau'],sortOrder:15 },
  { ...common, id:'demo-plan',src:withBase('/images/demo-plan.svg'),title:'Schematischer Demo-Grundriss',alt:'Beispielhafte Raumaufteilung ohne Bezug zu einem realen Gebäude',kind:'floorplan',variant:'shared',areas:['grundrisse'],floorId:'demo',sortOrder:30,width:1600,height:1050 },
];
