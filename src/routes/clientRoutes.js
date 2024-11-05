const express = require('express');
const router = express.Router();
const ClientController = require('../controller/clientController'); 
const authController = require('../controller/authController.js');

router.get('/clients',authController.authenticateToken, ClientController.findAllClients);

module.exports = router;
