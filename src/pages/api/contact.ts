import type {APIRoute} from 'astro';
import {readContact,validateContact} from '../../lib/validation/contact';
import {sendContact} from '../../lib/server/contact-service';
import {allowedRequest} from '../../lib/server/rate-limit';
import {site} from '../../config/site';
export const prerender=false;
const reply=(body:object,status:number)=>new Response(JSON.stringify(body),{status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'}});
export const POST:APIRoute=async ({request,url})=>{
 const origin=request.headers.get('origin');
 const publicOrigin=site.publicUrl ? new URL(site.publicUrl).origin : url.origin;
 if(!origin || (origin!==url.origin && origin!==publicOrigin))return reply({ok:false,code:'origin',message:'Anfrageursprung nicht erlaubt.'},403);
 const type=request.headers.get('content-type')??'';
 if(!type.includes('application/x-www-form-urlencoded') && !type.includes('multipart/form-data'))return reply({ok:false,code:'invalid',message:'Ungültiges Anfrageformat.'},415);
 const size=Number(request.headers.get('content-length')??0);
 if(size>12000)return reply({ok:false,code:'invalid',message:'Die Anfrage ist zu gross.'},413);
 let form:FormData;
 try{
  const chunks:Uint8Array[]=[];let total=0;
  const reader=request.body?.getReader();if(!reader)throw new Error('empty');
  while(true){const {done,value}=await reader.read();if(done)break;total+=value.byteLength;if(total>12000){await reader.cancel();return reply({ok:false,code:'invalid',message:'Die Anfrage ist zu gross.'},413);}chunks.push(value);}
  const payload=new Uint8Array(total);let offset=0;for(const chunk of chunks){payload.set(chunk,offset);offset+=chunk.byteLength;}
  form=await new Response(payload,{headers:{'Content-Type':type}}).formData();
 }catch{return reply({ok:false,code:'invalid',message:'Formulardaten konnten nicht gelesen werden.'},400);}
 const values=readContact(form);
 const errors=validateContact(values);
 if(Object.keys(errors).length)return reply({ok:false,code:'invalid',message:'Bitte korrigieren Sie die markierten Felder.',errors},422);
 if(form.get('privacy')!=='on')return reply({ok:false,code:'invalid',message:'Bitte bestätigen Sie den Datenschutzhinweis.',errors:{privacy:'Bitte bestätigen Sie den Datenschutzhinweis.'}},422);
 // Request IP is only transiently used for limiting; no network address is logged.
 const key=request.headers.get('cf-connecting-ip')||request.headers.get('x-real-ip')||'anonymous';
 if(!allowedRequest(key))return reply({ok:false,code:'rate_limited',message:'Zu viele Anfragen. Bitte versuchen Sie es später erneut.'},429);
 const outcome=await sendContact(values);
 return reply(outcome,outcome.ok?200:outcome.code==='unconfigured'?503:502);
};
export const ALL:APIRoute=()=>reply({ok:false,message:'Methode nicht erlaubt.'},405);
