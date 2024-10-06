const express = require('express');
const eComerceData = require('../controller/eComerceData'); // Asegúrate de que la ruta sea correcta

const router = express.Router();

// Ruta para iniciar sesión
router.get('/data/products', eComerceData.FindAllProducts);

router.get('/data/productsInterest', eComerceData.productItCanInterest);

router.get('/data/productsType/:typeProduct', eComerceData.findProductsType);


module.exports = router;
