# Atelier Haus – Premium-Immobilienwebsite

Eine **mehrseitige Astro-Website** mit einer von einem Graustufen-Wireframe abgeleiteten Startseite, zentralen Immobiliendaten, responsivem Editorial-Design, zweistufiger Galerie inklusive PhotoSwipe, Dokumentenverwaltung und serverseitiger Kontaktverarbeitung.

**Wichtiger Status:** Alle Objektangaben und Illustrationen sind **Demo-Inhalte**, kein reales Verkaufsangebot. Die Website wurde so gebaut, dass unbekannte Immobilienwerte nicht erfunden werden. Der Demo-Modus lässt keine erfolgreich zugestellte Nachricht vortäuschen. Vor dem Livegang gilt [LIVEGANG-CHECKLIST.md](./LIVEGANG-CHECKLIST.md).

## 1. Voraussetzungen und Schnellstart

- Node.js >= 20.11 (empfohlen Node.js 22)
- npm >= 10
- Internetverbindung zur erstmaligen Installation der npm-Pakete

```bash
cp .env.example .env
npm install
npm run dev
```

Im Browser `http://localhost:4321` öffnen. Die Webseite verwendet Astro 5, Tailwind CSS 4 über das Vite-Plugin, TypeScript, `@lucide/astro`, PhotoSwipe 5 und für API-Routen den Astro Node Adapter.

### Build und Test

```bash
npm run check:content    # Veröffentlichungsprüfung
npm run check            # Astro/TypeScript-Prüfung
npm run test             # Unit-Tests für Filter und Formular
npm run test:e2e         # Chromium-Browser-Tests (Playwright)
npm run build            # statische Seiten + Node-API
npm run preview
```

Playwright-Browser bei Bedarf zuerst herunterladen: `npx playwright install chromium`. Die End-to-End-Tests starten automatisch einen lokalen Entwicklungsserver. Browser- und Audit-Tests müssen auf der Zielumgebung erneut durchgeführt werden.

## 2. Routen und Anwendungsarchitektur

| Route | Funktion |
|---|---|
| `/` | Hero, Kennzahlen, Vorschau, Beschreibung, Ausstattung, Grundriss, Lage, Kontakt |
| `/haus` | Vertiefte Immobilien- und Technikbeschreibung |
| `/galerie` | Varianten- und Gebäudebereich-Filter, URL-Zustände, Lightbox |
| `/grundrisse` | Geschossansichten mit Zoom |
| `/lage` | Standort, Umgebungsinformationen, neutrale Demo-Karte |
| `/kontakt` | Wiederverwendbares Kontaktformular mit Anliegen-Vorwahl |
| `/unterlagen` | Öffentliche Dokumente und Anfrageaktionen |
| `/impressum` / `/datenschutz` | Prüffähige Rechtstextvorlagen |
| `/api/contact` | Nicht vorgerenderter POST-Endpunkt (Node) |
| `/404` | Fehlerseite |

Astro rendert Inhaltsseiten standardmässig statisch. **Nur die API-Route** benötigt einen Node-Prozess. Die Astro-Konfiguration verwendet `output: 'static'` mit `@astrojs/node` (`mode: 'standalone'`).

### Dateiverwaltung

```text
src/
  components/
    layout/           Header, Footer
    property/         Hero, Eckdaten, Objektbeschreibung, Ausstattung
    gallery/          Vorschau, Filter-Galerie
    floorplans/       Vorschau
    location/         Vorschau
    contact/          Formular und Kontaktbereich
    ui/               Lucide-Iconadapter, Überschriften
  config/             site.ts, gallery.ts
  data/               property.ts, media.ts, floorplans.ts,
                      documents.ts, renovations.ts, location.ts
  lib/gallery/        filter.ts, url-state.ts, lightbox.ts
  lib/validation/     contact.ts
  lib/server/         contact-service.ts, rate-limit.ts
  types/              Typisierte Schnittstellen
  pages/              Astro-Routen und api/contact.ts
  styles/             global.css
public/images/        Lokale, als DEMO markierte Illustrationen
public/documents/     Nur öffentlich freigegebene Unterlagen!
tests/                Vitest & Playwright
scripts/              Publikationsprüfung und SVG-Mustergenerator
```

## 3. Inhalte zentral ändern

1. Objektinformationen in `src/data/property.ts` bearbeiten. Unbekannte Werte **als `null` belassen** und nicht durch Musterzahlen ersetzen.
2. `src/config/site.ts`: Name, Locale, Währung, Ansprechpartner und Demo/Produktion. Die Standortgenauigkeit wird zentral über `property.precision` in `src/data/property.ts` gesetzt.
3. Orts- und Umgebungsangaben in `src/data/location.ts`, optional Koordinaten erst nach Freigabe.
4. Renovationen in `src/data/renovations.ts`.
5. Pläne in `src/data/floorplans.ts` und passende Medien in `src/data/media.ts`.
6. Dokumente in `src/data/documents.ts`.

**Beispieldaten** sind vollständig getrennt von Komponenten. Preis, Flächen und Zimmeranzahl werden automatisch formatiert und nur angezeigt, wenn vorhanden. CHF und `de-CH` sind voreingestellt. Für andere Währungen `property.currency` und `site.currency` entsprechend anpassen.

### Eigene Bilder ergänzen

1. Geeignete Medien unter `public/images/` ablegen, idealerweise hochwertige WebP/AVIF und responsive Ableitungen (im Livebetrieb über Astro Assets möglich).
2. In `src/data/media.ts` mit `id`, `src`, `title`, `alt`, `kind`, `variant`, `areas`, `width`, `height`, `published` und `isVerifiedOriginal` erfassen.
3. Optional `thumbnailSrc`, `roomId`, `floorId`, `sortOrder` hinterlegen.
4. `variant: 'modern'` oder `'familie'` ausschliesslich für klar deklarierte Visualisierungen verwenden. `variant: 'aktuell'` nur für **bestätigte Originalfotos**. `variant: 'shared'` für gemeinsame Unterlagen wie Grundrisse.
5. Ein Küchenbild kann `areas: ['innenbereich', 'kueche']` besitzen. Für Untergeschoss-/Nebenräume gilt standardmässig der Filterwert `unterbau`.

Die Galerie-/Lightbox-Zuordnung passt sich danach ohne Änderungen an der Darstellungskomponente an. Für produktive Immobilienfotos müssen zusätzlich bedarfsgerechte responsive Bildgrössen und Formate erzeugt werden. Die gelieferten SVGs sind ausschliesslich leichte Demo-Illustrationen und erfüllen **nicht** den Bildqualitätsanspruch echter Objektfotos.

### Galerie-Filter

Erste Stufe (`GalleryVariant`): `alle`, `modern`, `familie`, `aktuell`.

Zweite Stufe (`GalleryArea`): `alle-bereiche`, `aussenbereich`, `innenbereich`, `kueche`, `unterbau`, `grundrisse`.

Die zweite Stufe erscheint erst bei einer konkreten Variante. Die Auswahl wird beim Wechsel einer Variante zurückgesetzt. Der Zustand wird per `history.pushState` gespeichert, per `popstate` wiederhergestellt und durch `?variante=modern&bereich=kueche` geteilt. Leere Mengen haben einen sichtbaren Zustand; PhotoSwipe wird mit **genau den gefilterten Bildern** neu verbunden. Gemeinsame Medien werden ohne Dateiduplizierung berücksichtigt.

Die sichtbare Bezeichnung «Unterbau» lässt sich über `site.areaLabels.unterbau` ändern; der interne Datenwert bleibt stabil.

### Grundrisse

Neue Geschosse in `src/data/floorplans.ts` anlegen und auf `mediaId` eines Eintrags mit `kind:'floorplan'` verweisen. Alle Planansichten verwenden `object-fit: contain` und hinterlegte Bildmasse für Zoom. Vor Livegang den ausdrücklich schematischen `demo-plan` entfernen. Pläne werden niemals aus zufälligen Bilddaten abgeleitet.

### Dokumente und Datenschutz

In `documents.ts` muss für einen öffentlichen Download **beides** gelten: `access:'public'` und `approved:true`. Zusätzlich einen gültigen `path` hinterlegen. Dateien, die nur auf Anfrage verfügbar sein sollen, **nicht unter `public/` speichern**. Ein versteckter Link ist keine Zugriffssperre. Für geschützte Freigaben kann ein signierter, serverseitig autorisierter Download-Endpunkt ergänzt werden; der Muster-Code liefert bewusst keine privaten Dateien aus.

## 4. E-Mail und serverseitige Anfrage

Folgende Variablen stehen in `.env` zur Verfügung:

| Variable | Zweck |
|---|---|
| `SITE_MODE` | `demo` oder `production` |
| `PUBLIC_SITE_URL` | Echte HTTPS-Domain, Canonical-URLs und Sitemap |
| `RESEND_API_KEY` | API-Schlüssel des Transaktions-E-Mail-Dienstes |
| `CONTACT_FROM_EMAIL` | Verifizierte Absenderadresse beim E-Mail-Anbieter |
| `CONTACT_TO_EMAIL` | Tatsächliche Empfängeradresse |
| `RATE_LIMIT_SALT` | Reserviert für erweiterte Rate-Limits; derzeit nicht verwendet |

Vor dem produktiven Versand:

1. Anbieter-/Absender-Domain beim E-Mail-Anbieter verifizieren.
2. Alle drei E-Mail-Variablen eintragen.
3. `SITE_MODE=production` erst nach dem vollständigen Inhaltscheck setzen.
4. Kontrollierte Testanfragen mit echter Provider-Annahme (Antwort mit Nachrichten-ID), Providerfehlern und fehlender Konfiguration durchführen.

Der Endpunkt kontrolliert `Origin`, Content-Type und Eingabelängen, verwendet Honeypot und einen speicherbasierten Rate-Limiter (5 Anfragen je Schlüssel innerhalb von 15 Minuten), sendet Text ohne HTML-Injektion und gibt technische Geheimnisse nicht an den Browser weiter. Die Erfolgsmeldung erfolgt nur, wenn der E-Mail-Provider die Anfrage mit einer Nachrichten-ID bestätigt. Dies beweist **Annahme durch den Provider, nicht die endgültige Zustellung ins Postfach**.

**Sicherheitseinschränkung:** Der mitgelieferte In-Memory-Rate-Limiter ist für einen einzelnen Node-Prozess geeignet, aber nicht für mehrere Instanzen und nicht DDoS-sicher. Produktive Systeme benötigen zusätzlich einen vertrauenswürdig konfigurierten Reverse-Proxy/Edge-Schutz und ein persistentes Limit. Zusätzliche Fachprüfung und Anpassen der Proxy-Vertrauensstellung sind erforderlich.

## 5. Design, Anpassungen und Performance

Farben, Spacing, Schriftalternativen und Responsive-Regeln befinden sich in `src/styles/global.css` mit CSS-Variablen (`--bg`, `--forest`, `--accent` usw.). Die Gestaltung verwendet lokale Systemfonts und keine externen Fonts/Tracking-Skripte. Die Hero-Illustration wird priorisiert, restliche Bilder lazy geladen. Falls später echte Objektfotos eingesetzt werden, responsive `srcset` und Astro Bildverarbeitung ergänzen; SVG-Demo-Illustrationen brauchen keine Bitmap-Kompression.

Das Original-Wireframe liegt als nicht öffentlich ausgelieferte Referenz unter `reference/wireframe.png`.

Foto- und Plan-Betrachtung verwendet eine einzige zentrale PhotoSwipe-Initialisierung in `src/lib/gallery/lightbox.ts` für verschiedene Galerien. Fokus, Escape, Zoom und Touch-Steuerung werden von PhotoSwipe bereitgestellt. Animationen sind bewusst klein und berücksichtigen `prefers-reduced-motion`.

## 6. SEO und Standortdarstellung

- Individuelle Titles und Meta-Descriptions je Seite über `BaseLayout.astro`
- `noindex,nofollow` und `robots.txt` im Demo-Modus
- Canonical/OG-URLs nur bei tatsächlich konfiguriertem `PUBLIC_SITE_URL`
- Sitemap nur, wenn die Site-URL vorhanden ist
- Kein Fake-Standort, keine ungeprüften Distanzen, keine ungefragt eingebetteten Kartendienste
- Vor Livegang je nach konkreter, bestätigter Datenlage geeignete strukturierte Daten für das Immobilienangebot ergänzen

## 7. Deployment (Node)

Für den Node-Standalone-Adapter nach erfolgreichem `npm run build`:

```bash
node ./dist/server/entry.mjs
```

Stellen Sie einen Node-22-Host und HTTPS/Reverse-Proxy bereit. Die `dist/client`-Assets müssen von der Node-Laufzeit oder einer korrekt konfigurierten CDN-Auslieferung erreichbar sein. Die Umgebungsvariablen werden **serverseitig** konfiguriert; API-Schlüssel nie als `PUBLIC_...` bereitstellen. Die `PUBLIC_SITE_URL` vor dem Build setzen. Der genaue Deployment-Prozess richtet sich nach dem Host.

## 8. Prüfstatus & bekannte Einschränkungen

- Das Projekt enthält sowohl Unit- als auch Playwright-Tests. Ein erfolgreicher Teststatus darf ausschliesslich nach eigener Ausführung behauptet werden.
- Die Demo enthält keine verifizierten Immobilienkennzahlen, Originalfotos oder echten Pläne; «Aktuell + Aussenbereich» zeigt daher absichtlich eine Leermeldung.
- Rechtliche Texte sind Vorlagen und nicht rechtsgeprüft.
- Kein realer Versand ohne Produktionskonfiguration und verifizierte Versanddomain.
- Kein externes Kartenembed; eine neutrale Standortgrafik dient als Ersatz.
- Vor dem öffentlichen Livegang sind zwingend reale Medien, Inhaltspflege, Browser-Checks, Accessibility- und Performance-Messungen notwendig.

Dokumentierter Prüfstand: [VALIDIERUNG.md](./VALIDIERUNG.md). Weitere Freigaben: [LIVEGANG-CHECKLIST.md](./LIVEGANG-CHECKLIST.md).
