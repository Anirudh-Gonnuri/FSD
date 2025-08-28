
const http = require('http');
const url = require('url');
const PORT = 3000;

const items = [
  { id: 1, name: 'FitCheck Bangle', slug: 'bangle', category: 'wearable', price: 49.99, description: 'Basic activity bangle with step count & sleep tracking.', rating: 4.1, stock: 120 },
  { id: 2, name: 'FitCheck Pro Watch', slug: 'pro-watch', category: 'wearable', price: 129.99, description: 'Smartwatch with heart-rate and GPS.', rating: 4.6, stock: 55 },
  { id: 3, name: 'FitCheck Treadmill T100', slug: 'treadmill', category: 'equipment', price: 599.0, description: 'Compact treadmill with incline and 12 programs.', rating: 4.3, stock: 12 },
  { id: 4, name: 'FitCheck Protein (2kg)', slug: 'protein', category: 'nutrition', price: 39.99, description: 'Whey protein blend to support recovery.', rating: 4.5, stock: 200 },
  { id: 5, name: '1-month Gym Membership', slug: 'membership-1m', category: 'service', price: 29.0, description: 'Access to partner gyms for 1 month.', rating: 4.0, stock: 9999 },
  { id: 6, name: 'Personal Trainer Pack (5 sessions)', slug: 'trainer-pack', category: 'service', price: 199.0, description: 'Five 1-1 sessions with certified trainer.', rating: 4.8, stock: 30 }
];

function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;
  const query = parsed.query;

  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    return res.end();
  }

  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ error: 'Method not allowed. Use GET.' }));
  }

  if (pathname === '/api' || pathname === '/api/items') {
  
    let results = items.slice();

    if (query.item) {
      const needle = String(query.item).toLowerCase();
      results = results.filter(it => it.name.toLowerCase().includes(needle) || it.slug.toLowerCase().includes(needle));
    }

    if (query.category) {
      const cat = String(query.category).toLowerCase();
      results = results.filter(it => it.category.toLowerCase() === cat);
    }

    if (query.price) {
      const max = Number(query.price);
      if (!Number.isNaN(max)) results = results.filter(it => it.price <= max);
    }

    if (query.minPrice) {
      const min = Number(query.minPrice);
      if (!Number.isNaN(min)) results = results.filter(it => it.price >= min);
    }

    if (query.sort) {
      if (query.sort === 'price_asc') results.sort((a,b) => a.price - b.price);
      else if (query.sort === 'price_desc') results.sort((a,b) => b.price - a.price);
      else if (query.sort === 'rating') results.sort((a,b) => b.rating - a.rating);
    }

    if (query.limit) {
      const lim = parseInt(query.limit, 10);
      if (!Number.isNaN(lim) && lim > 0) results = results.slice(0, lim);
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ count: results.length, items: results }));
  }

  if (pathname === '/' ) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end('FitCheck API — visit /api or /api/items');
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log(`FitCheck API running at http://localhost:${PORT}`);
});