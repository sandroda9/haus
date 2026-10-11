import type {ContactValues} from '../../types/contact';
import type {ContactResult} from '../../types/contact';
import {isDemo} from '../../config/site';
const intentName={besichtigung:'Besichtigung',expose:'Exposé',frage:'Allgemeine Frage'};
export async function sendContact(data:ContactValues):Promise<ContactResult>{
 const apiKey=import.meta.env.RESEND_API_KEY ?? process.env.RESEND_API_KEY;
 const from=import.meta.env.CONTACT_FROM_EMAIL ?? process.env.CONTACT_FROM_EMAIL;
 const to=import.meta.env.CONTACT_TO_EMAIL ?? process.env.CONTACT_TO_EMAIL;
 if(isDemo || !apiKey || !from || !to){return {ok:false,code:'unconfigured',message:'Der Anfrageversand ist in dieser Demonstration nicht aktiviert. Bitte hinterlegen Sie geprüfte Kontaktdaten und einen Versanddienst.'};}
 const plain=[`Anliegen: ${intentName[data.intent]}`,`Name: ${data.firstName} ${data.lastName}`,`E-Mail: ${data.email}`,`Telefon: ${data.phone||'Nicht angegeben'}`,'',data.message].join('\n');
 try{
  const response=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],subject:`Immobilienanfrage: ${intentName[data.intent]}`,text:plain,reply_to:data.email}),signal:AbortSignal.timeout(12000)});
  if(!response.ok)return {ok:false,code:'error',message:'Der Versanddienst konnte die Anfrage nicht annehmen. Bitte versuchen Sie es später erneut.'};
  const result=await response.json() as {id?:string};
  if(!result.id)return {ok:false,code:'error',message:'Der Versanddienst hat keine bestätigte Annahme übermittelt.'};
  return {ok:true,code:'sent',message:'Ihre Anfrage wurde vom Versanddienst angenommen. Vielen Dank für Ihr Interesse.'};
 }catch{return {ok:false,code:'error',message:'Die Anfrage konnte aktuell nicht übertragen werden. Bitte versuchen Sie es später erneut.'};}
}
