const express = require('express');
const { findAllUsersWithRoles } = require('../controller/testAsociation');

const router = express.Router();

// Define your routes
router.get('/users', findAllUsersWithRoles);


module.exports = router;
