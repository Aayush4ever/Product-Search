const express = require('express');
const { createProduct, updateMetadata } = require('../controllers/product.controller');

const router = express.Router();
router.post('/product', createProduct);
router.put('/product/meta-data', updateMetadata);

module.exports = router;
