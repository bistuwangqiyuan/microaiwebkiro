const deployUrl = 'https://69aafef13269826018303844--microaiwebkiro.netlify.app';
const prodUrl = 'https://micro4.top';

for (const [label, base] of [['deploy', deployUrl], ['prod', prodUrl]]) {
  const res = await fetch(base);
  const html = await res.text();
  const re = /(?:src|href)="(\/_next\/static\/chunks\/[^"]+)"/g;
  const assets = new Set();
  let m;
  while ((m = re.exec(html)) !== null) assets.add(m[1]);
  console.log(`\n=== ${label} (${base}) ===`);
  console.log(`Assets: ${assets.size}`);
  for (const path of assets) {
    const r = await fetch(base + path);
    const ct = r.headers.get('content-type') || 'unknown';
    console.log(r.status, ct.split(';')[0], path.slice(path.lastIndexOf('/') + 1));
  }
  const cacheHeader = res.headers.get('cache-control') || 'none';
  const age = res.headers.get('age') || 'none';
  const etag = res.headers.get('etag') || 'none';
  console.log(`Cache-Control: ${cacheHeader}, Age: ${age}, ETag: ${etag}`);
}
