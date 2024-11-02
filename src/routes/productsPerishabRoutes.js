// routes/productsPerishabRoutes.js
const express = require('express');
const router = express.Router();

const ProductsPerishablesController = require('../controller/productsPerishablesController.js');
const authController = require('../controller/authController.js');
const upload = require('../../middleware/uploadMiddleware.js');

router.post(
  '/products_perishables',
  authController.authenticateToken,
  upload.array('images', 5),
  ProductsPerishablesController.createProductsPerishables
);

router.put(
  '/update_products_perishables/:product_perishable_id',
  authController.authenticateToken,
  upload.array('images', 5),
  ProductsPerishablesController.updateProductsPerishables
);

router.put(
  '/products_perishables/:product_perishable_id',
  authController.authenticateToken,
  ProductsPerishablesController.changeStatusProductsPerishables
);

router.get(
  '/products_perishables/:product_perishable_id',
  authController.authenticateToken,
  ProductsPerishablesController.findOneProductsPerishables
);

router.get(
  '/products_perishables',
  authController.authenticateToken,
  ProductsPerishablesController.findAllProductsPerishables
);

module.exports = router;
