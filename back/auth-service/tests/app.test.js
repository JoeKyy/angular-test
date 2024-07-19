const request = require('supertest');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const jwt = require('jsonwebtoken');
const app = require('../src/app');

const mock = new MockAdapter(axios);
const SECRET_KEY = process.env.AUTH_SECRET_KEY;

let server;

beforeAll(() => {
  server = app.listen(4000);
});

afterAll((done) => {
  server.close(done);
});

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Auth Service', () => {
  describe('POST /api/auth', () => {
    it('should return a token for valid credentials', async () => {
      const mockUser = { id: 1, username: 'test', password: 'test' };
      mock.onGet('http://localhost:3004/users', { params: { username: 'test' } }).reply(200, [mockUser]);
      jest.spyOn(jwt, 'sign').mockReturnValue('fakeToken');

      const response = await request(app)
        .post('/api/auth')
        .send({ username: 'test', password: 'test' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('fakeToken');
    });

    it('should return 401 for invalid credentials', async () => {
      const mockUser = { id: 1, username: 'test', password: 'test' };
      mock.onGet('http://localhost:3004/users', { params: { username: 'test' } }).reply(200, [mockUser]);

      const response = await request(app)
        .post('/api/auth')
        .send({ username: 'test', password: 'wrongpassword' });

      expect(response.status).toBe(401);
    });

    it('should return 500 for server error', async () => {
      mock.onGet('http://localhost:3004/users', { params: { username: 'test' } }).reply(500);

      const response = await request(app)
        .post('/api/auth')
        .send({ username: 'test', password: 'test' });

      expect(response.status).toBe(500);
    });
  });

  describe('POST /api/register', () => {
    it('should return a token for successful registration', async () => {
      mock.onGet('http://localhost:3004/users', { params: { username: 'newuser' } }).reply(200, []);
      mock.onPost('http://localhost:3004/users', { username: 'newuser', password: 'password' }).reply(201, { id: 2, username: 'newuser' });
      jest.spyOn(jwt, 'sign').mockReturnValue('fakeToken');

      const response = await request(app)
        .post('/api/register')
        .send({ username: 'newuser', password: 'password' });

      expect(response.status).toBe(200);
      expect(response.body.token).toBe('fakeToken');
    });

    it('should return 400 for existing user', async () => {
      const mockUser = { id: 1, username: 'existinguser', password: 'password' };
      mock.onGet('http://localhost:3004/users', { params: { username: 'existinguser' } }).reply(200, [mockUser]);

      const response = await request(app)
        .post('/api/register')
        .send({ username: 'existinguser', password: 'password' });

      expect(response.status).toBe(400);
      expect(response.text).toBe('User already exists');
    });

    it('should return 500 for server error', async () => {
      mock.onGet('http://localhost:3004/users', { params: { username: 'newuser' } }).reply(500);

      const response = await request(app)
        .post('/api/register')
        .send({ username: 'newuser', password: 'password' });

      expect(response.status).toBe(500);
    });
  });
});
