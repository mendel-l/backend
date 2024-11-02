const express = require('express');
const router = express.Router();
const UserController = require('../controller/usersController');
const authController = require('../controller/authController.js');

router.post('/users', authController.authenticateToken, UserController.createUser);
router.put('/users/:id', authController.authenticateToken, UserController.updateUser);
router.put('/users/:id/status', authController.authenticateToken, UserController.changeStatusUser);
router.get('/users',authController.authenticateToken, UserController.findAllUsers);
router.get('/users/:id',authController.authenticateToken, UserController.findOneUser);

module.exports = router;
