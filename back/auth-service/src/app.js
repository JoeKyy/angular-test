require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.AUTH_SECRET_KEY || 'your_jwt_secret';

app.use(bodyParser.json());
app.use(cors());

app.post('/api/auth', async (req, res) => {
  const { username, password } = req.body;

  try {
    const response = await axios.get('http://localhost:3004/users', {
      params: { username: username }
    });

    const user = response.data[0];
    if (user && user.password === password) {
      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUserResponse = await axios.get('http://localhost:3004/users', {
      params: { username: username }
    });

    if (existingUserResponse.data.length > 0) {
      return res.status(400).send('User already exists');
    }

    const response = await axios.post('http://localhost:3004/users', {
      username: username,
      password: password
    });

    const user = response.data;
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal server error');
  }
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Auth service running on port ${PORT}`));
}

module.exports = app;
