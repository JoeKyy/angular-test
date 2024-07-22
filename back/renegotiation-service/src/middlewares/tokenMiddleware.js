const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.AUTH_SECRET_KEY || 'your_jwt_secret';

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const clientHeader = req.headers['client-credentials'];

  if (!authHeader || !clientHeader) return res.status(403).send('Token and client credentials are required');

  const token = authHeader.split(' ')[1];
  const [clientId, clientSecret] = clientHeader.split(':');

  if (clientId !== process.env.CLIENT_ID || clientSecret !== process.env.CLIENT_SECRET) {
    return res.status(401).send('Invalid client credentials');
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(500).send('Failed to authenticate token.');
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
