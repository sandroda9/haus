import { site } from '../config/site';
export function price(value: number | null, currency = site.currency) { return value == null ? null : new Intl.NumberFormat(site.locale,{style:'currency',currency,maximumFractionDigits:0}).format(value); }
export function area(value: number | null) { return value == null ? null : `${new Intl.NumberFormat(site.locale,{maximumFractionDigits:1}).format(value)} m²`; }
export function number(value: number | null) { return value == null ? null : new Intl.NumberFormat(site.locale).format(value); }
