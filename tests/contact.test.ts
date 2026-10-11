import {describe,it,expect} from 'vitest';
import {readContact,validateContact,safeIntent} from '../src/lib/validation/contact';
const base={firstName:'Anna',lastName:'Muster',email:'anna@example.ch',phone:'',intent:'besichtigung' as const,message:'Ich möchte weitere Informationen erhalten.',website:''};
describe('Kontaktvalidierung',()=>{
 it('akzeptiert korrekte Eingaben',()=>expect(validateContact(base)).toEqual({}));
 it('verwirft ungültige oder manipulierte Anliegen',()=>expect(safeIntent('superuser')).toBe('frage'));
 it('erkennt Feldfehler',()=>{
  const errors=validateContact({...base,firstName:'',email:'falsch',message:'kurz',intent:'evil' as never});
  expect(errors.firstName).toBeTruthy();expect(errors.email).toBeTruthy();expect(errors.message).toBeTruthy();expect(errors.intent).toBeTruthy();
 });
 it('erkennt Honeypot',()=>expect(validateContact({...base,website:'spam'}).website).toBeTruthy());
 it('trimmt Nutzereingaben',()=>{
  const fd=new FormData();fd.append('firstName','  Anna  ');expect(readContact(fd).firstName).toBe('Anna');
 });
 it('prüft die Nachrichtenlänge',()=>expect(validateContact({...base,message:'x'.repeat(4001)}).message).toBeTruthy());
});
