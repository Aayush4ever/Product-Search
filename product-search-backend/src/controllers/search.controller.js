const { getAllProducts } = require('../data/productStore');
const { rankProducts } = require('../services/ranking.service');
const {
  normalizeQuery,
  extractPrice,
  extractColor
} = require('../services/queryParser.service');

function searchProducts(req, res) {
  const rawQuery = req.query.query;
  if (!rawQuery) {
    return res.status(400).json({ message: 'Query required' });
  }

  const query = normalizeQuery(rawQuery);
  const keywords = query.split(' ');

  const maxPrice = extractPrice(query);
  const color = extractColor(query);

  let products = getAllProducts();

  // ✅ KEYWORD-BASED MATCHING
  products = products.filter(product => {
    const searchableText = `
      ${product.title}
      ${product.description || ''}
      ${Object.values(product.metadata).join(' ')}
    `.toLowerCase();

    return keywords.some(word => searchableText.includes(word));
  });

  // ✅ PRICE FILTER
  if (maxPrice) {
    products = products.filter(p => p.price <= maxPrice);
  }

  // ✅ COLOR FILTER
  if (color) {
    products = products.filter(
      p => p.metadata.color?.toLowerCase() === color
    );
  }

  // ✅ RANKING
  const rankedProducts = rankProducts(products, query);

  res.json({ data: rankedProducts });
}

module.exports = { searchProducts };
