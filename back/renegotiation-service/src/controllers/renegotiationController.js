const renegotiationService = require('../services/renegotiationService');

const getRenegotiations = async (req, res) => {
  try {
    const renegotiations = await renegotiationService.getRenegotiations(req.userId);
    res.json({ renegotiations });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getRenegotiations
};
