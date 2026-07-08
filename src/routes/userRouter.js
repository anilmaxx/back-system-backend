const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const userController = require('../controllers/userController');

// GET /users (Admin only)
router.get('/', auth, admin, userController.getAllUsers);

module.exports = router;