const express = require('express');
const router = express.Router();
const ProductsNonPerishablesController = require('../controller/productsNonPerishablesController.js');
const authController = require('../controller/authController.js');

// Proteger las rutas que necesitan autenticación
router.post('/products_non_perishables', authController.authenticateToken, ProductsNonPerishablesController.createProductsNonPerishables);
router.put('/products_non_perishables/:id', authController.authenticateToken, ProductsNonPerishablesController.updateProductsNonPerishables);
router.put('/products_non_perishables/:id/status', authController.authenticateToken, ProductsNonPerishablesController.changeStatusProductsNonPerishables);

// Las demás rutas no están protegidas
router.get('/products_non_perishables', authController.authenticateToken, ProductsNonPerishablesController.findAllProductsNonPerishables);
router.get('/products_non_perishables/:id',authController.authenticateToken, ProductsNonPerishablesController.findOneProductsNonPerishables);

module.exports = router;
