/// <reference types="astro/client" />
interface ImportMetaEnv {
 readonly SITE_MODE?: 'demo' | 'production';
 readonly PUBLIC_SITE_URL?: string;
 readonly RESEND_API_KEY?: string;
 readonly CONTACT_FROM_EMAIL?: string;
 readonly CONTACT_TO_EMAIL?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv }
