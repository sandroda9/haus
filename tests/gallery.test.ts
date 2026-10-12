import {describe,it,expect} from 'vitest';
import {media} from '../src/data/media';
import {mediaForState,defaultState} from '../src/lib/gallery/filter';
import {parseGalleryState,galleryQuery} from '../src/lib/gallery/url-state';

describe('zweistufige Galerie',()=>{
 it('startet mit Alle und versteckter zweiter Filterstufe',()=>{expect(defaultState).toEqual({variant:'alle',area:'alle-bereiche'});});
 it('zeigt bei Modern nur modern und shared',()=>{
  const result=mediaForState(media,{variant:'modern',area:'alle-bereiche'});
  expect(result.length).toBeGreaterThan(0);expect(result.every(x=>x.variant==='modern'||x.variant==='shared')).toBe(true);
 });
 it('filtert Modern + Küche korrekt',()=>{
  expect(mediaForState(media,{variant:'modern',area:'kueche'}).map(x=>x.id)).toEqual(['modern-kueche']);
 });
 it('filtert Familie + Innenbereich inkl. Küche',()=>{
  const result=mediaForState(media,{variant:'familie',area:'innenbereich'});
  expect(result.some(x=>x.id==='familie-kueche')).toBe(true);expect(result.every(x=>x.variant==='familie')).toBe(true);
 });
 it('zeigt unter Aktuell nur verifizierte Originalaufnahmen des Aussenbereichs',()=>{
  const result=mediaForState(media,{variant:'aktuell',area:'aussenbereich'});
  expect(result.length).toBe(8);
  expect(result.every(x=>x.kind==='photo'&&x.isVerifiedOriginal&&x.variant==='aktuell')).toBe(true);
  expect(result[0].id).toBe('haus-hochwiese-1');
 });
 it('zeigt unter Aktuell keine Wohnideen oder Innenaufnahmen',()=>{
  expect(mediaForState(media,{variant:'aktuell',area:'innenbereich'})).toEqual([]);
 });
 it('teilt gemeinsame Grundrisse zwischen Varianten',()=>{
  for(const variant of ['modern','familie','aktuell'] as const){
   expect(mediaForState(media,{variant,area:'grundrisse'}).map(m=>m.id)).toContain('demo-plan');
  }
 });
 it('unterbau liefert nur passende Medien',()=>{
  expect(mediaForState(media,{variant:'modern',area:'unterbau'}).map(x=>x.id)).toEqual(['modern-unterbau']);
 });
 it('sortiert stabil nach sortOrder',()=>{
  const sorted=mediaForState(media,defaultState);expect(sorted[0].id).toBe('haus-hochwiese-1');
 });
 it('liest den Direktlink',()=>{
  expect(parseGalleryState(new URLSearchParams('variante=modern&bereich=kueche'))).toEqual({variant:'modern',area:'kueche'});
 });
 it('fällt bei falschen URL-Werten zurück',()=>{
  expect(parseGalleryState(new URLSearchParams('variante=falsch&bereich=kueche'))).toEqual(defaultState);
  expect(parseGalleryState(new URLSearchParams('variante=alle&bereich=kueche'))).toEqual(defaultState);
  expect(parseGalleryState(new URLSearchParams('variante=modern&bereich=falsch'))).toEqual({variant:'modern',area:'alle-bereiche'});
 });
 it('roundtrip durch URL-Serialisierung',()=>{
  const state={variant:'familie' as const,area:'innenbereich' as const};expect(parseGalleryState(new URLSearchParams(galleryQuery(state)))).toEqual(state);
 });
});
