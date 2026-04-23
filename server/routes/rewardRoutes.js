const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const auth = require('../middleware/auth');

router.get('/', rewardController.getAllRewards); // Public can see rewards too maybe
router.post('/', auth, rewardController.createReward);
router.patch('/:id', auth, rewardController.updateReward);

module.exports = router;
