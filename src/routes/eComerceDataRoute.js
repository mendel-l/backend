const express = require('express');
const eComerceData = require('../controller/eComerceData');

const router = express.Router();

// Existing routes
router.get('/data/products', eComerceData.FindAllProducts);
router.get('/data/productsInterest', eComerceData.productItCanInterest);
router.get('/data/productsDiscount', eComerceData.productsWithDiscount);
router.get('/data/productsType/:typeProduct', eComerceData.findProductsType);
router.post('/sesion/client',eComerceData.createClient);
// Updated search route
router.get('/data/search', eComerceData.searchProducts);

module.exports = router;