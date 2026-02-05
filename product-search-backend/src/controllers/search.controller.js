const Product = require('../models/Product');
const { rankProducts } = require('../services/ranking.service');
const { enhanceQuery } = require('../services/llm.service');

async function searchProducts(req, res) {
  const rawQuery = req.query.query;
  if (!rawQuery) {
    return res.status(400).json({ message: 'Query required' });
  }

  const query = await enhanceQuery(rawQuery);
  const keywords = query.split(' ');

  let products = await Product.find();

  products = products.filter(p => {
    const text = `
      ${p.title}
      ${p.description}
      ${Object.values(p.metadata || {}).join(' ')}
    `.toLowerCase();

    return keywords.some(k => text.includes(k));
  });

  const ranked = rankProducts(products, query);
  res.json({ data: ranked });
}

module.exports = { searchProducts };
