const chargeService = require('../services/chargeService');

const getCharges = async (req, res) => {
  try {
    const charges = await chargeService.getCharges();
    res.json({ charges });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getCharges
};
