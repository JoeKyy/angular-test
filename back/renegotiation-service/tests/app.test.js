const request = require('supertest');
const jwt = require('jsonwebtoken');
const renegotiationService = require('../src/services/renegotiationService');
const app = require('../src/app');

jest.mock('axios');
jest.mock('jsonwebtoken');
jest.mock('../src/services/renegotiationService');

process.env.CLIENT_ID = 'validClientId';
process.env.CLIENT_SECRET = 'validClientSecret';
process.env.AUTH_SECRET_KEY = 'your_jwt_secret';

describe('Renegotiation Service', () => {
  describe('GET /api/renegotiations', () => {
    it('should return renegotiations for a valid request', async () => {
      const renegotiations = [{ id: 1, status: 'pending', userId: 1 }, { id: 2, status: 'approved', userId: 1 }];
      renegotiationService.getRenegotiations.mockResolvedValue(renegotiations);
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(null, { id: 1 });
      });

      const response = await request(app)
        .get('/api/renegotiations')
        .set('Authorization', 'Bearer mockToken')
        .set('Client-Credentials', 'validClientId:validClientSecret');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ renegotiations });
    });

    it('should return 403 if no token or client credentials are provided', async () => {
      const response = await request(app).get('/api/renegotiations');

      expect(response.status).toBe(403);
      expect(response.text).toBe('Token and client credentials are required');
    });

    it('should return 500 if token is invalid', async () => {
      jwt.verify.mockImplementation((token, secret, callback) => {
        callback(new Error('Invalid token'));
      });

      const response = await request(app)
        .get('/api/renegotiations')
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
        .get('/api/renegotiations')
        .set('Authorization', 'Bearer mockToken')
        .set('Client-Credentials', 'invalidClientId:invalidClientSecret');

      expect(response.status).toBe(401);
      expect(response.text).toBe('Invalid client credentials');
    });
  });
});
