const Product = require('../models/Product');

async function createProduct(req, res) {
  const product = await Product.create(req.body);
  res.status(201).json({ productId: product._id });
}

async function updateMetadata(req, res) {
  const { productId, metadata } = req.body;

  const product = await Product.findByIdAndUpdate(
    productId,
    { $set: { metadata } },
    { new: true }
  );

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
}

module.exports = { createProduct, updateMetadata };
