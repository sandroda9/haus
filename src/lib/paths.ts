const base = (import.meta.env?.BASE_URL ?? '/haus/').replace(/\/$/, '');

export function withBase(path: string): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path)) return path;
  if (path === base || path.startsWith(`${base}/`) || path.startsWith(`${base}?`) || path.startsWith(`${base}#`)) return path;
  return `${base}/${path.replace(/^\/+/, '')}`;
}
