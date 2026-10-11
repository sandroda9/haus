import type {ContactValues,ContactErrors,ContactIntent} from '../../types/contact';
export const validIntents:ReadonlySet<string>=new Set<ContactIntent>(['besichtigung','expose','frage']);
export function readContact(input:FormData | Record<string,unknown>):ContactValues {
 const get=(name:string)=>input instanceof FormData?input.get(name):input[name];
 const clean=(name:string)=>typeof get(name)==='string' ? String(get(name)).trim() : '';
 return {firstName:clean('firstName'),lastName:clean('lastName'),email:clean('email'),phone:clean('phone'),intent:clean('intent') as ContactIntent,message:clean('message'),website:clean('website')};
}
export function validateContact(values:ContactValues):ContactErrors {
 const e:ContactErrors={};
 if(values.firstName.length<2||values.firstName.length>80)e.firstName='Bitte geben Sie einen Vornamen mit 2–80 Zeichen ein.';
 if(values.lastName.length<2||values.lastName.length>80)e.lastName='Bitte geben Sie einen Nachnamen mit 2–80 Zeichen ein.';
 if(values.email.length>254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email))e.email='Bitte geben Sie eine gültige E-Mail-Adresse ein.';
 if(values.phone && (values.phone.length<6||values.phone.length>35||!/^[+\d\s()./-]+$/.test(values.phone)))e.phone='Bitte prüfen Sie die Telefonnummer.';
 if(!validIntents.has(values.intent))e.intent='Bitte wählen Sie eine gültige Anfrageart.';
 if(values.message.length<10||values.message.length>4000)e.message='Bitte geben Sie eine Nachricht mit 10–4000 Zeichen ein.';
 if(values.website)e.website='Diese Anfrage kann nicht bearbeitet werden.';
 return e;
}
export function safeIntent(value:unknown):ContactIntent { return typeof value==='string' && validIntents.has(value)?value as ContactIntent:'frage'; }
