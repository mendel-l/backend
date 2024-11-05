const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.post('/order', OrderController.createOrderWithDetails);  // Crear una nueva orden con detalles
router.get('/order/:order_id', OrderController.getOrderWithDetails);  // Obtener una orden con detalles por ID
router.put('/order/:order_id', OrderController.updateOrderWithDetails);  // Actualizar una orden con detalles por ID
router.delete('/order/:order_id', OrderController.deleteOrderWithDetails);  // Eliminar una orden con detalles por ID

module.exports = router;