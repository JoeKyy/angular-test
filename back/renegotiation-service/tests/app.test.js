const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

const SECRET_KEY = process.env.AUTH_SECRET_KEY || 'your_jwt_secret';

describe('Renegotiation Service', () => {
  let server;

  beforeAll(() => {
    server = app.listen(4001);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('GET /api/renegotiations', () => {
    it('should return renegotiations for a valid token', async () => {
      const token = jwt.sign({ id: 1 }, SECRET_KEY, { expiresIn: '1h' });

      const response = await request(app)
        .get('/api/renegotiations')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.renegotiations).toBeDefined();
      expect(response.body.renegotiations.length).toBe(2);
      expect(response.body.renegotiations[0].status).toBe('pending');
    });

    it('should return 403 if no token is provided', async () => {
      const response = await request(app)
        .get('/api/renegotiations');

      expect(response.status).toBe(403);
      expect(response.text).toBe('Token is required');
    });

    it('should return 500 for an invalid token', async () => {
      const response = await request(app)
        .get('/api/renegotiations')
        .set('Authorization', 'Bearer invalidtoken');

      expect(response.status).toBe(500);
      expect(response.text).toBe('Failed to authenticate token.');
    });
  });
});
