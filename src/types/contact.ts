export type ContactIntent = 'besichtigung' | 'expose' | 'frage';
export interface ContactValues { firstName: string; lastName: string; email: string; phone: string; intent: ContactIntent; message: string; website: string }
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export type ContactResult = { ok: boolean; code: 'sent'|'invalid'|'unconfigured'|'rate_limited'|'origin'|'error'; message: string; errors?: ContactErrors };
