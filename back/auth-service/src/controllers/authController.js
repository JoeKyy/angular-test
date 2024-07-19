const authService = require('../services/authService');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authService.register(username, password);
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
