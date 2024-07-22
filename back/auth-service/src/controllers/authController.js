const authService = require('../services/authService');

const getToken = async (req, res) => {
  const { clientId, clientSecret } = req.body;
  try {
    const token = await authService.getToken(clientId, clientSecret);
    res.json({ token });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authService.login(username, password);
    res.json({ token });
  } catch (error) {
    res.status(401).send(error.message);
  }
};

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authService.register(username, password);
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getToken,
  login,
  register
};
