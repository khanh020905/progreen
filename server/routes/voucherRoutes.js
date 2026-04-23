const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');
const auth = require('../middleware/auth');

router.post('/validate', voucherController.validateVoucher);
router.get('/', auth, voucherController.getAllVouchers);
router.post('/', auth, voucherController.createVoucher);

module.exports = router;
