const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const transactionController = require('../controllers/transactionController');

//POST /api/transactions/deposit = (user)
router.post('/deposit', auth, transactionController.deposit);
module.exports = router;