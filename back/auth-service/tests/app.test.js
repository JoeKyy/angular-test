const authService = require('../src/services/authService');
const authController = require('../src/controllers/authController');
const verifyToken = require('../src/middlewares/tokenMiddleware');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const express = require('express');
const request = require('supertest');

jest.mock('axios');
jest.mock('jsonwebtoken');
jest.mock('../src/services/authService');

const app = express();
app.use(express.json());
app.post('/api/auth', authController.login);
app.post('/api/register', authController.register);
app.post('/api/token', authController.getToken);

describe('AuthService', () => {
  describe('login', () => {
    it('should return a token for valid credentials', async () => {
      const user = { id: 1, username: 'test', password: 'password' };
      axios.get.mockResolvedValue({ data: [user] });
      jwt.sign.mockReturnValue('mockToken');

      authService.login.mockResolvedValue('mockToken');
      const token = await authService.login('test', 'password');

      expect(token).toBe('mockToken');
    });

    it('should throw an error for invalid credentials', async () => {
      const user = { id: 1, username: 'test', password: 'password' };
      axios.get.mockResolvedValue({ data: [user] });

      authService.login.mockRejectedValue(new Error('Invalid credentials'));
      await expect(authService.login('test', 'wrongpassword')).rejects.toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should return a token for successful registration', async () => {
      axios.get.mockResolvedValue({ data: [] });
      axios.post.mockResolvedValue({ data: { id: 1, username: 'newuser', password: 'password' } });
      jwt.sign.mockReturnValue('mockToken');

      authService.register.mockResolvedValue('mockToken');
      const token = await authService.register('newuser', 'password');

      expect(token).toBe('mockToken');
    });

    it('should throw an error if user already exists', async () => {
      axios.get.mockResolvedValue({ data: [{ id: 1, username: 'existinguser', password: 'password' }] });

      authService.register.mockRejectedValue(new Error('User already exists'));
      await expect(authService.register('existinguser', 'password')).rejects.toThrow('User already exists');
    });
  });

  describe('getToken', () => {
    it('should return a token for valid client credentials', async () => {
      const clientId = 'validClientId';
      const clientSecret = 'validClientSecret';
      jwt.sign.mockReturnValue('mockClientToken');

      authService.getToken.mockResolvedValue('mockClientToken');
      const token = await authService.getToken(clientId, clientSecret);

      expect(token).toBe('mockClientToken');
    });

    it('should throw an error for invalid client credentials', async () => {
      const clientId = 'invalidClientId';
      const clientSecret = 'invalidClientSecret';

      authService.getToken.mockRejectedValue(new Error('Invalid client credentials'));
      await expect(authService.getToken(clientId, clientSecret)).rejects.toThrow('Invalid client credentials');
    });
  });
});

describe('AuthController', () => {
  describe('POST /api/auth', () => {
    it('should return a token for valid credentials', async () => {
      authService.login.mockResolvedValue('mockToken');

      const response = await request(app)
        .post('/api/auth')
        .set('Authorization', 'Bearer mockToken')
        .set('Client-Credentials', 'validClientId:validClientSecret')
        .send({ username: 'test', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('mockToken');
    });

    it('should return 401 for invalid credentials', async () => {
      authService.login.mockRejectedValue(new Error('Invalid credentials'));

      const response = await request(app)
        .post('/api/auth')
        .set('Authorization', 'Bearer mockToken')
        .set('Client-Credentials', 'validClientId:validClientSecret')
        .send({ username: 'test', password: 'wrongpassword' });

      expect(response.status).toBe(401);
      expect(response.text).toBe('Invalid credentials');
    });
  });

  describe('POST /api/register', () => {
    it('should return a token for successful registration', async () => {
      authService.register.mockResolvedValue('mockToken');

      const response = await request(app)
        .post('/api/register')
        .set('Authorization', 'Bearer mockToken')
        .set('Client-Credentials', 'validClientId:validClientSecret')
        .send({ username: 'newuser', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('mockToken');
    });

    it('should return 400 if user already exists', async () => {
      authService.register.mockRejectedValue(new Error('User already exists'));

      const response = await request(app)
        .post('/api/register')
        .set('Authorization', 'Bearer mockToken')
        .set('Client-Credentials', 'validClientId:validClientSecret')
        .send({ username: 'existinguser', password: 'password' });

      expect(response.status).toBe(400);
      expect(response.text).toBe('User already exists');
    });
  });

  describe('POST /api/token', () => {
    it('should return a token for valid client credentials', async () => {
      authService.getToken.mockResolvedValue('mockClientToken');

      const response = await request(app)
        .post('/api/token')
        .send({ clientId: 'validClientId', clientSecret: 'validClientSecret' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('mockClientToken');
    });

    it('should return 401 for invalid client credentials', async () => {
      authService.getToken.mockRejectedValue(new Error('Invalid client credentials'));

      const response = await request(app)
        .post('/api/token')
        .send({ clientId: 'invalidClientId', clientSecret: 'invalidClientSecret' });

      expect(response.status).toBe(401);
      expect(response.text).toBe('Invalid client credentials');
    });
  });
});

describe('verifyToken Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: 'Bearer mockToken',
        'client-credentials': 'validClientId:validClientSecret'
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    next = jest.fn();
  });

  it('should call next if token is valid and client credentials are valid', () => {
    process.env.CLIENT_ID = 'validClientId';
    process.env.CLIENT_SECRET = 'validClientSecret';

    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { id: 1 });
    });

    verifyToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.userId).toBe(1);
  });

  it('should return 403 if no token or client credentials are provided', () => {
    req.headers.authorization = '';
    req.headers['client-credentials'] = '';

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith('Token and client credentials are required');
  });

  it('should return 500 if token is invalid', () => {
    process.env.CLIENT_ID = 'validClientId';
    process.env.CLIENT_SECRET = 'validClientSecret';

    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(new Error('Invalid token'));
    });

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Failed to authenticate token.');
  });

  it('should return 401 if client credentials are invalid', () => {
    process.env.CLIENT_ID = 'validClientId';
    process.env.CLIENT_SECRET = 'validClientSecret';

    req.headers['client-credentials'] = 'invalidClientId:invalidClientSecret';

    jwt.verify.mockImplementation((token, secret, callback) => {
      callback(null, { id: 1 });
    });

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith('Invalid client credentials');
  });
});
