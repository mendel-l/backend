const express = require('express');
const router = express.Router();
const ProductsNonPerishablesController = require('../controller/productsNonPerishablesController.js');
const authController = require('../controller/authController.js');
const upload = require('../../middleware/uploadMiddleware.js');

// Proteger las rutas que necesitan autenticación y manejar las imágenes
router.post(
  '/products_non_perishables',
  authController.authenticateToken,
  upload.array('images', 5), // Manejar imágenes (máximo 5)
  ProductsNonPerishablesController.createProductsNonPerishables
);

router.put(
  '/products_non_perishables/:id',
  authController.authenticateToken,
  upload.array('images', 5), // Manejar imágenes (máximo 5)
  ProductsNonPerishablesController.updateProductsNonPerishables
);

router.put(
  '/products_non_perishables/:id/status',
  authController.authenticateToken,
  ProductsNonPerishablesController.changeStatusProductsNonPerishables
);

router.get(
  '/products_non_perishables',
  authController.authenticateToken,
  ProductsNonPerishablesController.findAllProductsNonPerishables
);

router.get(
  '/products_non_perishables/:id',
  authController.authenticateToken,
  ProductsNonPerishablesController.findOneProductsNonPerishables
);
module.exports = router;
