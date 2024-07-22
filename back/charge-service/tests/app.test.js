const chargeService = require('../src/services/chargeService');
const chargeController = require('../src/controllers/chargeController');
const verifyToken = require('../src/middlewares/tokenMiddleware');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const express = require('express');
const request = require('supertest');

jest.mock('axios');
jest.mock('jsonwebtoken');
jest.mock('../src/services/chargeService');

process.env.CLIENT_ID = 'validClientId';
process.env.CLIENT_SECRET = 'validClientSecret';
process.env.AUTH_SECRET_KEY = 'your_jwt_secret';

const app = express();
app.use(express.json());
app.get('/api/charges', verifyToken, chargeController.getCharges);

describe('ChargeService', () => {
  describe('getCharges', () => {
    it('should return a list of charges for a valid user', async () => {
      const charges = [{ id: 1, userId: 1, amount: 100, status: 'pending' }];
      axios.get.mockResolvedValue({ data: charges });

      chargeService.getCharges.mockResolvedValue(charges);
      const result = await chargeService.getCharges(1);

      expect(result).toEqual(charges);
    });

    it('should throw an error if fetching charges fails', async () => {
      axios.get.mockRejectedValue(new Error('Failed to fetch charges'));

      chargeService.getCharges.mockRejectedValue(new Error('Failed to fetch charges'));
      await expect(chargeService.getCharges(1)).rejects.toThrow('Failed to fetch charges');
    });
  });
});

describe('ChargeController', () => {
  describe('GET /api/charges', () => {
    it('should return a list of charges for a valid request', async () => {
      const charges = [{ id: 1, userId: 1, amount: 100, status: 'pending' }];
      chargeService.getCharges.mockResolvedValue(charges);
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { id: 1 });
      });

      const response = await request(app)
        .get('/api/charges')
        .set('Authorization', 'Bearer mockToken')
        .set('Client-Credentials', 'validClientId:validClientSecret');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ charges });
    });

    it('should return 403 if no token or client credentials are provided', async () => {
      const response = await request(app).get('/api/charges');

      expect(response.status).toBe(403);
      expect(response.text).toBe('Token and client credentials are required');
    });

    it('should return 500 if token is invalid', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error('Invalid token'));
      });

      const response = await request(app)
        .get('/api/charges')
        .set('Authorization', 'Bearer invalidToken')
        .set('Client-Credentials', 'validClientId:validClientSecret');

      expect(response.status).toBe(500);
      expect(response.text).toBe('Failed to authenticate token.');
    });

    it('should return 401 if client credentials are invalid', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { id: 1 });
      });

      const response = await request(app)
        .get('/api/charges')
        .set('Authorization', 'Bearer mockToken')
        .set('Client-Credentials', 'invalidClientId:invalidClientSecret');

      expect(response.status).toBe(401);
      expect(response.text).toBe('Invalid client credentials');
    });
  });
});
