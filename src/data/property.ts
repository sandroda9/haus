import type { Property } from '../types/property';
export const property: Property = {
  id: 'demo-haus-001', name: 'Haus Hochwiese 1', heroMediaId:'haus-hochwiese-1',
  eyebrow: 'HAUS HOCHWIESE 1 · AUSSENAUFNAHMEN',
  heading: 'Haus Hochwiese 1.',
  subtitle: 'Aktuelle Aufnahmen geben einen ersten Einblick in Haus Hochwiese 1 und seine Aussenbereiche.',
  type: null, transaction: 'sale',
  description: [
    'Die aktuellen Aussenaufnahmen zeigen Haus Hochwiese 1, seine Terrassen und die Gartenbereiche.',
    'Weitere Angaben zu Ausstattung, Flächen und Zustand werden ergänzt, sobald sie verifiziert sind.',
    'Wohnideen und schematische Pläne auf dieser Website sind digitale Visualisierungen und keine tatsächlichen Innenaufnahmen oder Baupläne.'
  ],
  price: null, priceOnRequest: false, currency: 'CHF',
  country: 'CH', region: null, municipality: null, street: null, postalCode: null, precision: 'municipality',
  livingArea: null, plotArea: null, rooms: null, bedrooms: null, bathrooms: null, floors: null,
  parking: null, yearBuilt: null, condition: null, heating: null, energy: null, availability: null, status: 'unknown',
  features: [], technicalDetails: [],
  sections: [
   { title: 'Aussenansicht & Garten', text: 'Die aktuellen Aufnahmen geben einen Einblick in die Aussenansicht und die Gartenbereiche von Haus Hochwiese 1.', mediaId: 'haus-hochwiese-1' },
   { title: 'Wohnen & Alltag', text: 'Visualisierte Wohnideen zeigen beispielhaft, wie eine Präsentation unterschiedliche Bedürfnisse berücksichtigen kann. Echte Raumaufnahmen ersetzen später diese Demo-Medien.', mediaId: 'modern-wohnen' },
   { title: 'Perspektiven für Familien', text: 'Die zweite Wohnidee zeigt eine wärmere, familienorientierte Atmosphäre. Eine Visualisierung ist dabei ausdrücklich kein Nachweis für Ausstattung oder baulichen Zustand.', mediaId: 'familie-wohnen' }
  ], verified: false,
};
