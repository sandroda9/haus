/// <reference types="astro/client" />
interface ImportMetaEnv {
 readonly SITE_MODE?: 'demo' | 'production';
 readonly PUBLIC_SITE_URL?: string;
 readonly PUBLIC_FORMSPREE_ENDPOINT?: string;
}
interface ImportMeta { readonly env: ImportMetaEnv }
