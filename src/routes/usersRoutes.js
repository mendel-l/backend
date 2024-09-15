const express = require('express');
const router = express.Router();
const UserController = require('../controller/usersController');

router.post('/users', UserController.createUser);
router.get('/users', UserController.findAllUsers);
router.get('/users/:id', UserController.findOneUser);
router.put('/users/:id', UserController.updateUser);
router.put('/users/:id/status', UserController.changeStatusUser);

module.exports = router;
