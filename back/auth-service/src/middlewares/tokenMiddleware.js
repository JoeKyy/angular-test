const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.AUTH_SECRET_KEY || 'your_jwt_secret';

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

module.exports = verifyToken;
