const axios = require('axios');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.AUTH_SECRET_KEY || 'your_jwt_secret';

const getToken = async (clientId, clientSecret) => {
  const isValidClient = (clientId === process.env.CLIENT_ID && clientSecret === process.env.CLIENT_SECRET);

  if (!isValidClient) {
    throw new Error('Invalid client credentials');
  }

  const token = jwt.sign({ clientId }, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

const login = async (username, password) => {
  const response = await axios.get('http://localhost:3004/users', {
    params: { username }
  });

  const user = response.data[0];
  if (user && user.password === password) {
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    return token;
  } else {
    throw new Error('Invalid credentials');
  }
};

const register = async (username, password) => {
  const existingUserResponse = await axios.get('http://localhost:3004/users', {
    params: { username }
  });

  if (existingUserResponse.data.length > 0) {
    throw new Error('User already exists');
  }

  const response = await axios.post('http://localhost:3004/users', { username, password });
  const user = response.data;
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

module.exports = {
  getToken,
  login,
  register
};
