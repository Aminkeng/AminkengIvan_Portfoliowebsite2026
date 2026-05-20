const request = require('supertest');

// Minimal mock so tests work without a real DB
jest.mock('../src/config/db', () => jest.fn());
jest.mock('../src/models/Project', () => ({
  find: jest.fn().mockReturnValue({
    sort: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([]),
      }),
    }),
  }),
  countDocuments: jest.fn().mockResolvedValue(0),
  findOne: jest.fn().mockResolvedValue(null),
}));
jest.mock('../src/models/Contact', () => ({
  create: jest.fn().mockResolvedValue({ _id: 'mock-id', email: 'test@test.com' }),
}));
jest.mock('../src/utils/email', () => ({
  sendContactNotification: jest.fn().mockResolvedValue({}),
  sendContactAutoReply: jest.fn().mockResolvedValue({}),
}));

const app = require('../src/server');

describe('Health check', () => {
  it('GET /health returns 200', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Projects API', () => {
  it('GET /api/projects returns 200 with empty list', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('GET /api/projects/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/projects/000000000000000000000001');
    expect(res.statusCode).toBe(404);
  });
});

describe('Contact API', () => {
  it('POST /api/contact validates required fields', async () => {
    const res = await request(app).post('/api/contact').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('POST /api/contact succeeds with valid payload', async () => {
    const res = await request(app).post('/api/contact').send({
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello from the test suite!',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });
});

describe('Auth API', () => {
  it('POST /api/auth/login fails without credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.statusCode).toBe(400);
  });
});

describe('404 handler', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/api/unknown-route');
    expect(res.statusCode).toBe(404);
  });
});
