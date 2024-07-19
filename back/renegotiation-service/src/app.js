require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3003;
const SECRET_KEY = process.env.AUTH_SECRET_KEY || 'your_jwt_secret';

app.use(bodyParser.json());
app.use(cors());

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(403).send('Token is required');

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token.');
    }
    req.userId = decoded.id;
    next();
  });
};

app.get('/api/renegotiations', verifyToken, (req, res) => {
  res.json({ renegotiations: [{ id: 1, status: 'pending' }, { id: 2, status: 'approved' }] });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Renegotiation service running on port ${PORT}`));
} else {
  module.exports = app;
}
