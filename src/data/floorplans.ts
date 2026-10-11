export interface Floorplan { id: string; name: string; description: string; mediaId: string; area: number | null; rooms: string[]; verified: boolean; documentId?: string }
export const floorplans: Floorplan[] = [
 { id:'demo', name:'Muster-Grundriss', description:'Nicht massstäbliche Demonstration einer möglichen Grundrissdarstellung. Kein amtlicher oder realer Bauplan.',mediaId:'demo-plan',area:null,rooms:[],verified:false }
];
