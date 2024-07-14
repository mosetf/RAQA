require('dotenv').config();
const request = require('supertest');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const passport = require('../config/passport');
const routes = require('../routes/routes');

const app = express();

// Middleware setup
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', routes);

// Connect to database before tests
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

// Close the database connection after tests
afterAll(async () => {
    await mongoose.connection.close();
});

// Test cases
describe('Authentication API', () => {
    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/register')
            .send({ username: 'newuser', email: 'newuser@example.com', password: 'newpassword' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Registration successful');
    });

    it('should log in a user', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({ email: 'testuser@example.com', password: 'testpassword' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Logged in successfully');
        expect(response.body.token).toBeDefined();
    });
});
