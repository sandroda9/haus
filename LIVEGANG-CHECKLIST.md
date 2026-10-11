# Livegang-Checkliste – verbindliche Prüfungen

Die Musterwebsite **ist kein veröffentlichtes Immobilienangebot**. Vor `SITE_MODE=production`:

- [ ] Verantwortliche Person/Firma, vollständige Anschrift, E-Mail, Telefonnummer verifizieren und in `src/config/site.ts` eintragen.
- [ ] Echte Objekt-ID, Name, Land/Region/Gemeinde/Adresse und gewollte Standortgenauigkeit festlegen.
- [ ] Alle verfügbaren Flächen, Zimmer, Baujahr, Zustand, Preis, Verfügbarkeit und Verkaufsstatus anhand belastbarer Unterlagen verifizieren.
- [ ] Demotexte in `src/data/property.ts` durch objektspezifische Angaben ersetzen, `verified: true` erst nach inhaltlicher Kontrolle.
- [ ] Alle Demo-Illustrationen durch rechtlich verwendbare, korrekte Objektaufnahmen ersetzen bzw. eindeutig gekennzeichnete echte Visualisierungen hinterlegen.
- [ ] Originalaufnahmen nur mit `variant: 'aktuell'` und `isVerifiedOriginal: true` markieren, wenn Authentizität geprüft.
- [ ] Demo-Grundriss entfernen und echte, geprüfte Pläne mit korrektem Zoom und Abmessungen hinterlegen.
- [ ] Dokumente nach Freigabe unter `public/documents/` veröffentlichen; vertrauliche Unterlagen niemals dort ablegen.
- [ ] Ausstattungsmerkmale, technische Angaben, Renovationen und Umgebungseinrichtungen freigeben.
- [ ] Rechtliche Texte und Datenschutzkonzept (DSG, allenfalls DSGVO), Datenflüsse, Aufbewahrungsfristen und Dienstleister durch Fachperson prüfen.
- [ ] E-Mail-Versanddienst mit `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` konfigurieren und kontrollierte Testanfrage durchführen.
- [ ] Rate-Limiter mit persistentem Edge-Store oder Redis für Produktion ergänzen; aktuell pro Node-Instanz im Arbeitsspeicher.
- [ ] Öffentliche HTTPS-Domain in `PUBLIC_SITE_URL` angeben, Sitemap, robots.txt und Canonicals kontrollieren.
- [ ] Reale Medien für WebP/AVIF nach Möglichkeit mit Astro Assets optimieren; LCP- und Mobile-Messungen vornehmen.
- [ ] `npm run check:content`, `npm run check`, `npm run test`, `npm run test:e2e`, `npm run build` erfolgreich ausführen.
- [ ] Datenschutz, Impressum, korrekte Kontaktdaten, Fokusnavigation, Barrierefreiheit und alle Formulardaten auf dem Produktivsystem testen.
