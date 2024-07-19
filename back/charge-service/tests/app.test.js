const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

const SECRET_KEY = process.env.AUTH_SECRET_KEY || 'your_jwt_secret';

describe('Charges Service', () => {
  let token;

  beforeAll(() => {
    token = jwt.sign({ id: 1 }, SECRET_KEY, { expiresIn: '1h' });
  });

  it('should return charges for a valid token', async () => {
    const response = await request(app)
      .get('/api/charges')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.charges).toEqual([{ id: 1, amount: 100 }, { id: 2, amount: 200 }]);
  });

  it('should return 403 if no token is provided', async () => {
    const response = await request(app).get('/api/charges');

    expect(response.status).toBe(403);
    expect(response.text).toBe('Token is required');
  });

  it('should return 500 for an invalid token', async () => {
    const response = await request(app)
      .get('/api/charges')
      .set('Authorization', 'Bearer invalid_token');

    expect(response.status).toBe(500);
    expect(response.text).toBe('Failed to authenticate token.');
  });
});
