const res = await fetch('https://micro4.top');
const html = await res.text();

const re = /(?:src|href)="(\/_next\/static\/chunks\/[^"]+)"/g;
const assets = [];
let m;
while ((m = re.exec(html)) !== null) assets.push(m[1]);

console.log('Assets found:', assets.length);
for (const path of assets) {
  const r = await fetch('https://micro4.top' + path);
  const ct = r.headers.get('content-type');
  const ok = r.ok && (ct?.includes('javascript') || ct?.includes('text/css'));
  console.log(r.status, ct, ok ? 'OK' : 'BAD', path.slice(path.lastIndexOf('/') + 1));
}
