import type {APIRoute} from 'astro';
import {site,isDemo} from '../config/site';
import {withBase} from '../lib/paths';
export const GET:APIRoute=()=>new Response(isDemo?'User-agent: *\nDisallow: /\n':`User-agent: *\nAllow: /\n${site.publicUrl?`Sitemap: ${new URL(withBase('/sitemap-index.xml'),site.publicUrl)}\n`:''}`,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
