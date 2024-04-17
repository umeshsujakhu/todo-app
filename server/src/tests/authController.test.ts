import request from 'supertest';
import express, { Express } from 'express';
import { setupTestEnvironment, teardownTestEnvironment } from './testSetup';
import { clearDatabase } from '../config/db';
import bcrypt from 'bcrypt';
import User from '../model/User';

const app: Express = express();

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await setupTestEnvironment(app);
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  await clearDatabase();
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await teardownTestEnvironment();
});

describe('POST /register', () => {
  it('should show error while registering with existing email', async () => {
    const password = await bcrypt.hash('password123' as string, 10);
    const existingUser = new User({
      email: 'test@gmail.com',
      password,
    });
    await existingUser.save();

    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'test@gmail.com',
      password: 'password',
    });

    expect(res.status).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual([{ path: 'email', message: 'Email already exists' }]);
  });

  it('should show required validation error for missing fields', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'testgmail.com',
      password: 'password',
    });

    expect(res.status).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual([{ path: 'email', message: 'Please enter a valid email address.' }]);
  });

  it('should show error for invalid email value', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({});

    expect(res.status).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toEqual([
      { path: 'email', message: 'Email is required' },
      { path: 'password', message: 'Password is required' },
    ]);
  });

  it('should register a new user', async () => {
    const res = await request(app).post('/api/v1/auth/register').send({
      email: 'test@gmail.com',
      password: 'password',
    });

    expect(res.status).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      }),
    );
  });
});

describe('POST /login', () => {
  // TODO: login tests
});
