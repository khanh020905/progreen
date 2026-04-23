const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');
const auth = require('../middleware/auth');

router.post('/', claimController.submitClaim);
router.get('/', auth, claimController.getAllClaims);
router.patch('/:id/status', auth, claimController.updateClaimStatus);

module.exports = router;
