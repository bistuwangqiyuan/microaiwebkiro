const checks = [
  ['homepage', 'https://micro4.top/', '微型算力中心'],
  ['products', 'https://micro4.top/products', '产品矩阵'],
  ['case-study', 'https://micro4.top/case-study', '微算降本对比案例'],
  ['product-detail', 'https://micro4.top/products/wecalc-b', '微算-B 基础版'],
];

for (const [name, url, text] of checks) {
  const res = await fetch(url);
  const html = await res.text();
  const ok = res.ok && html.includes(text);
  const hasError = html.includes('Application error') || html.includes('client-side exception');
  console.log(ok ? 'PASS' : 'FAIL', name, `(${res.status})`, hasError ? '[HAS ERROR TEXT]' : '');
}

const re = /src="(\/_next\/static\/chunks\/[^"]+)"/g;
const homeHtml = await (await fetch('https://micro4.top')).text();
let m;
let allOk = true;
while ((m = re.exec(homeHtml)) !== null) {
  const r = await fetch('https://micro4.top' + m[1]);
  if (!r.ok) { allOk = false; console.log('CHUNK FAIL', m[1]); }
}
console.log(allOk ? 'PASS all-chunks' : 'FAIL some-chunks');
