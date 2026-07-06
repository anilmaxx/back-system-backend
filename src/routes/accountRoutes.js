const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const accountController = require('../controllers/accountController');


//POST /api/account/create  = (user)
router.post('/create', auth, accountController.createAccount);

//GET /api/account/me(user) = (user)
router.get('/me', auth, accountController.getMyAccounts);

//GET /api/account/:accountNumber = (Admin only)
router.get('/:id', auth, admin, accountController.getAccountById);


module.exports = router;