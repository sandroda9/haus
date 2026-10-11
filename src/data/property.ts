import type { Property } from '../types/property';
export const property: Property = {
  id: 'demo-haus-001', name: 'Atelier Haus', heroMediaId:'modern-aussen',
  eyebrow: 'EINZELIMMOBILIE · DEMONSTRATION',
  heading: 'Architektur, die Raum zum Leben lässt.',
  subtitle: 'Ein digitales Exposé als Beispiel für eine besondere Immobilie. Alle Objektdaten und Ansichten sind in dieser Version Musterinhalte.',
  type: null, transaction: 'sale',
  description: [
    'Gute Architektur beginnt mit einem Gefühl: Ruhe, Klarheit und ein natürlicher Übergang zwischen Innen und Aussen. Diese Demonstration zeigt, wie sich genau dieses Gefühl digital vermitteln lässt.',
    'Der Aufbau führt von der ersten Impression zu Raumkonzepten, Ausstattungsmerkmalen, Plänen und Lageinformationen. Verbindliche Aussagen zum Verkaufsobjekt werden erst nach Eingabe geprüfter Daten veröffentlicht.',
    'Die gezeigten Illustrationen sind eigens gestaltete Demo-Visualisierungen und keine Fotografien einer realen Immobilie.'
  ],
  price: null, priceOnRequest: false, currency: 'CHF',
  country: 'CH', region: null, municipality: null, street: null, postalCode: null, precision: 'municipality',
  livingArea: null, plotArea: null, rooms: null, bedrooms: null, bathrooms: null, floors: null,
  parking: null, yearBuilt: null, condition: null, heating: null, energy: null, availability: null, status: 'unknown',
  features: [], technicalDetails: [],
  sections: [
   { title: 'Architektur & Ausdruck', text: 'Eine reduzierte, materialbewusste Formensprache setzt den gestalterischen Rahmen. Die Abbildungen sind konzeptionelle Platzhalter und zeigen keine nachgewiesenen Baumerkmale.', mediaId: 'modern-aussen' },
   { title: 'Wohnen & Alltag', text: 'Visualisierte Wohnideen zeigen beispielhaft, wie eine Präsentation unterschiedliche Bedürfnisse berücksichtigen kann. Echte Raumaufnahmen ersetzen später diese Demo-Medien.', mediaId: 'modern-wohnen' },
   { title: 'Perspektiven für Familien', text: 'Die zweite Wohnidee zeigt eine wärmere, familienorientierte Atmosphäre. Eine Visualisierung ist dabei ausdrücklich kein Nachweis für Ausstattung oder baulichen Zustand.', mediaId: 'familie-wohnen' }
  ], verified: false,
};
