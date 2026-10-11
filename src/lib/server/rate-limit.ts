// Best-effort, memory-only limiter for one Node instance. At scale use a trusted edge limiter or Redis.
const requests = new Map<string,number[]>();
export function allowedRequest(key:string, now=Date.now()):boolean {
 const period=15*60*1000;const history=(requests.get(key)??[]).filter(t=>now-t<period);
 if(history.length>=5){requests.set(key,history);return false;}
 history.push(now);requests.set(key,history);
 if(requests.size>5000){for(const [k,v] of requests)if(v.every(t=>now-t>=period))requests.delete(k);}
 return true;
}
