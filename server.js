require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const routes = require('./routes/routes');
const passport = require('./config/passport');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const RateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));
app.use(passport.initialize());
app.use(passport.session());

async function getQuote() {
    try {
        var category = 'happiness';
        const api_url = `https://api.api-ninjas.com/v1/quotes?category=${category}`;
        const response = await axios.get(api_url, headers={ 'X-Api-Key': process.env.API_KEY });
        const data = response.data[0];
        return { quoteText: data.content, quoteAuthor: data.author };
    } catch (error) {
        logger.error(error);
        return { quoteText: 'Error fetching quote', quoteAuthor: "" };
    }
}

// API route to get a random quote
app.get('/api/quote', async (req, res) => {
    const quote = await getQuote();
    res.json(quote);
});

// API routes
app.use('/api', routes);

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = RateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max 100 requests per windowMs
});

// Serve the React app for all other routes
app.get('*', limiter, (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Something went wrong');
});

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(port, () => logger.info(`Server listening on port ${port}`));
});
