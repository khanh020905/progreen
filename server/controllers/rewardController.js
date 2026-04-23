const Reward = require('../models/Reward');

exports.getAllRewards = async (req, res) => {
  try {
    const rewards = await Reward.find().sort({ name: 1 });
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReward = async (req, res) => {
  try {
    const { name, description, image, isActive } = req.body;
    
    const reward = new Reward({
      name,
      description,
      image,
      isActive: isActive !== undefined ? isActive : true
    });

    await reward.save();
    res.status(201).json(reward);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReward = async (req, res) => {
  try {
    const { id } = req.params;
    const reward = await Reward.findByIdAndUpdate(id, req.body, { new: true });
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json(reward);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
