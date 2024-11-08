// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const CartController = require('../controller/cartController');

router.post('/cartAdding', CartController.createCart);  // Crear un nuevo carrito para un cliente
router.post('/cart/item', CartController.addItemToCart);  // Añadir un producto al carrito
router.put('/cart/:cart_id/state', CartController.updateCartState);  // Actualizar el estado del carrito

module.exports = router;
