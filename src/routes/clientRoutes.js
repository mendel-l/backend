const express = require('express');
const router = express.Router();
const ClientController = require('../controller/clientController'); 
const authController = require('../controller/authController.js');

router.post('/clients', authController.authenticateToken, ClientController.createClient);
router.put('/clients/:id', authController.authenticateToken, ClientController.updateClient);
router.put('/clients/:id', authController.authenticateToken, ClientController.changeStatusClient);
router.get('/clients/:id',authController.authenticateToken, ClientController.findOneClient);
router.get('/clients',authController.authenticateToken, ClientController.findAllClients);

module.exports = router;
