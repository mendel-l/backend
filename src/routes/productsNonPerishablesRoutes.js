const express = require('express');
const router = express.Router();
const ProductsNonPerishablesController = require('../controller/productsNonPerishablesController.js'); // Asegúrate de que la ruta sea correcta

router.post('/products_non_perishables', ProductsNonPerishablesController.createProductsNonPerishables);
router.put('/products_non_perishables/:id', ProductsNonPerishablesController.updateProductsNonPerishables);
router.get('/products_non_perishables', ProductsNonPerishablesController.findAllProductsNonPerishables);
router.get('/products_non_perishables/:id', ProductsNonPerishablesController.findOneProductsNonPerishables);
router.put('/products_non_perishables/:id/status', ProductsNonPerishablesController.changeStatusProductsNonPerishables);

module.exports = router;
