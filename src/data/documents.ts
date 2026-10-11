export interface PropertyDocument { id:string; title:string; description:string; fileType:string; fileSize?:string; access:'public'|'request'; path?:string; approved:boolean }
export const documents: PropertyDocument[] = [
 {id:'expose',title:'Verkaufsdokumentation',description:'Ausführliches Exposé mit geprüften Objektdaten und Bildern – nach Verfügbarkeit.',fileType:'PDF',access:'request',approved:false},
 {id:'plaene',title:'Verifizierte Grundrisse',description:'Massstäbliche Originalpläne werden ergänzt, sobald sie freigegeben sind.',fileType:'PDF',access:'request',approved:false},
 {id:'technik',title:'Technische Unterlagen',description:'Energie- und Baunachweise, soweit vorhanden und freigegeben.',fileType:'PDF',access:'request',approved:false}
];
