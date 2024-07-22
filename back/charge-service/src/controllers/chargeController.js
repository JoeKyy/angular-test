const chargeService = require('../services/chargeService');

const getCharges = async (req, res) => {
  const { userId } = req;
  try {
    const charges = await chargeService.getCharges(userId);
    res.json({ charges });
  } catch (error) {
    res.status(500).send('Failed to fetch charges');
  }
};

module.exports = {
  getCharges
};
