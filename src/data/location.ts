export interface SurroundingHighlight { name:string; description:string; verified:boolean; distance?:string }
export const location = { overview: 'Der Standort wird nach Freigabe der tatsächlichen Adresse beziehungsweise Gemeinde ergänzt.', precision:'municipality' as const, highlights: [] as SurroundingHighlight[], coordinates:null as {lat:number;lon:number}|null };
