const {
    addProduct,
    updateProductMetadata
  } = require('../data/productStore');
  
  function createProduct(req, res) {
    const { title, description, rating, stock, price, mrp, currency } = req.body;
  
    if (!title || price == null || stock == null) {
      return res.status(400).json({ message: 'Invalid input' });
    }
  
    const product = addProduct({
      title,
      description,
      rating,
      stock,
      price,
      mrp,
      currency
    });
  
    res.status(201).json({ productId: product.productId });
  }
  
  function updateMetadata(req, res) {
    const productId = Number(req.body.productId);
    const metadata = req.body.metadata;
  
    if (!productId || !metadata) {
      return res.status(400).json({ message: 'Invalid input' });
    }
  
    const product = updateProductMetadata(productId, metadata);
  
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
  
    res.json({ productId, metadata: product.metadata });
  }
  
  module.exports = {
    createProduct,
    updateMetadata
  };
  