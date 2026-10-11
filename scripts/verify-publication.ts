import { loadEnv } from 'vite';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
Object.assign(process.env, loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), ''));
const [{ site }, { property }, { media }, { documents }, {floorplans}] = await Promise.all([
 import('../src/config/site'), import('../src/data/property'), import('../src/data/media'), import('../src/data/documents'), import('../src/data/floorplans')
]);

const errors:string[]=[];
if(!['demo','production'].includes(site.mode))errors.push('SITE_MODE ist ungültig.');
const ids = new Set<string>();
for(const item of media){
 if(ids.has(item.id)) errors.push(`Doppelte Medien-ID: ${item.id}`);
 ids.add(item.id);
 if(!item.src.startsWith('/images/')) errors.push(`Ungültiger Medienpfad: ${item.src}`);
 else if(!existsSync(join(process.cwd(),'public',item.src)))errors.push(`Mediendatei fehlt: ${item.src}`);
 if(!item.areas.length || item.width<=0 || item.height<=0) errors.push(`Ungültige Medienzuordnung/Abmessung: ${item.id}`);
 if(item.variant==='aktuell' && (!item.isVerifiedOriginal || item.kind!=='photo')) errors.push(`Nicht verifizierte Originalaufnahme: ${item.id}`);
 if(item.variant!=='aktuell' && item.isVerifiedOriginal) errors.push(`Falsche Original-Kennzeichnung: ${item.id}`);
}
if(!media.some(m=>m.id===property.heroMediaId && m.published))errors.push('Hero-Bildreferenz ist ungültig.');
for(const plan of floorplans){if(!media.some(m=>m.id===plan.mediaId && m.kind==='floorplan'))errors.push(`Grundriss-Referenz ungültig: ${plan.id}`);}
const docIds=new Set<string>();
for(const doc of documents){
 if(docIds.has(doc.id))errors.push(`Doppelte Dokumenten-ID: ${doc.id}`);
 docIds.add(doc.id);
 if(doc.access==='request' && doc.path?.startsWith('/documents/'))errors.push(`Anfrage-Dokument darf nicht öffentlich referenziert werden: ${doc.id}`);
 if(doc.access==='public' && (!doc.approved || !doc.path?.startsWith('/documents/'))) errors.push(`Ungültige Dokumentenfreigabe: ${doc.id}`);
 if(doc.access==='public' && doc.path?.startsWith('/documents/') && !existsSync(join(process.cwd(),'public',doc.path)))errors.push(`Dokumentendatei fehlt: ${doc.id}`);
}
if(site.mode==='production'){
 if(!property.verified) errors.push('Immobiliendaten sind nicht verifiziert.');
 if(!site.publicUrl || !/^https:\/\//.test(site.publicUrl)) errors.push('PUBLIC_SITE_URL als HTTPS-Adresse fehlt.');
 if(!site.company.name || !site.company.email || !site.company.street || !site.company.city) errors.push('Verifizierte Anbieterinformationen fehlen.');
 if(!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) errors.push('Kontaktversand nicht konfiguriert.');
 if(!media.some(m => m.variant==='aktuell' && m.isVerifiedOriginal && m.published)) errors.push('Mindestens eine verifizierte Originalaufnahme erforderlich.');
 if(!media.some(m=>m.id===property.heroMediaId && m.variant==='aktuell' && m.isVerifiedOriginal))errors.push('Hero muss eine verifizierte Originalaufnahme verwenden.');
 if(floorplans.some(p=>!p.verified))errors.push('Nicht verifizierte Grundrisse müssen ersetzt oder entfernt werden.');
 if(media.some(m=>m.published && m.kind==='floorplan' && !m.isVerifiedPlan))errors.push('Nicht verifizierte Grundrissmedien dürfen nicht veröffentlicht werden.');
 if(media.some(m=>m.published && m.kind==='floorplan' && m.floorId==='demo')) errors.push('Demo-Grundriss darf nicht live gehen.');
}
if(errors.length){ console.error('Veröffentlichungsprüfung fehlgeschlagen:\n' + errors.map(e=>`• ${e}`).join('\n')); process.exit(1); }
console.log(`Inhaltsprüfung erfolgreich (${site.mode}, ${media.length} Medien).`);
