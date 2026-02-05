const express = require('express');
const { searchProducts } = require('../controllers/search.controller');

const router = express.Router();
router.get('/search/product', searchProducts);

module.exports = router;
