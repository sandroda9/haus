# Verifizierungsbericht – Stand 11. Oktober 2026

## Tatsächlich in dieser Arbeitsumgebung ausgeführt

| Prüfung | Ergebnis |
|---|---|
| Node und npm erkannt | Node 22.16.0, npm 10.9.2 |
| TypeScript-Parser aller TS-Dateien sowie Astro-Frontmatter/-Clientskripte | 50 Dateien geprüft; 0 gemeldete **Syntaxfehler** |
| Isolierte Kompilierung von Galerie-/URL-/Kontakt-TS-Modulen | Erfolgreich mit globalem TypeScript-Compiler |
| Gezielte Laufzeitaspekte für Galerie-Filter, geteilte Grundrisse, URL-Parsing und Kontaktvalidierung | 14 eigenständige Assertions mit tatsächlichem Demo-Mediensatz erfolgreich |
| CSS-Parser (PostCSS) | Erfolgreich |
| Medienpfade | 11 Referenzen geprüft, keine fehlenden Dateien |
| Statische Routenlinks | Vorhandene Routen geprüft; Favicon ist ein Asset, keine Route |
| SVG-Demo-Illustrationen | Generiert und als DEMO gekennzeichnet |

## Nicht ausführbar / offen

Ein vollständiger `npm install` war in der Ausführungsumgebung **nicht möglich**. Der npm-Registry-DNS-Zugriff war gesperrt und `npm install --offline` meldete `ENOTCACHED` bei `@astrojs/check`. Daher konnten `astro build`, `astro check`, Vitest, Playwright-Screenshots und Lighthouse **hier nicht** ausgeführt werden.

Die Tests liegen im Projekt und müssen nach Installation mit Netzwerkzugang durchgeführt werden. Es gibt **keine Behauptung**, dass der produktive Astro-Build, die Browserscreenshots oder die Versand-Zustellung bereits erfolgreich überprüft wären.

## Inhaltliche Grenzen des Demostands

- Keine echten Immobilienfotos, realen Kennzahlen, Originalpläne, Standortkoordinaten oder Kontaktdaten geliefert.
- Galerievarianten sind demonstrierbar; «Aktuell» zeigt keine fingierten Originalaufnahmen.
- Der E-Mail-Endpunkt ist implementiert, aber ohne gültige Providerkonfiguration nicht versandfähig.
- Juristische Texte sind nur Vorlagen.
- Der In-Memory-Rate-Limiter muss für verteilte Produktionsumgebungen ersetzt oder ergänzt werden.
- Keine auditierte WCAG-/Lighthouse-Konformität ohne reale Browser-Tests.

Alle für den Livegang notwendigen Schritte sind in `LIVEGANG-CHECKLIST.md` dokumentiert.
