const jwt = require('jsonwebtoken');
const axios = require('axios');

const SECRET_KEY = process.env.AUTH_SECRET_KEY || 'your_jwt_secret';

class AuthService {
  async login(username, password) {
    const response = await axios.get('http://localhost:3004/users', { params: { username } });
    const user = response.data[0];
    if (user && user.password === password) {
      return jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    } else {
      throw new Error('Invalid credentials');
    }
  }

  async register(username, password) {
    const existingUserResponse = await axios.get('http://localhost:3004/users', { params: { username } });
    if (existingUserResponse.data.length > 0) {
      throw new Error('User already exists');
    }

    const response = await axios.post('http://localhost:3004/users', { username, password });
    const user = response.data;
    return jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
  }
}

module.exports = new AuthService();
