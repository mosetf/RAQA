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

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/public')));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));
app.use(passport.initialize());
app.use(passport.session());

// Function to fetch a random quote
async function getQuote() {
    try {
        const response = await axios.get('https://api.quotable.io/quotes/random');
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

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/public', 'index.html'));
});

// API routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Something went wrong');
});

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(port, () => logger.info(`Server listening on port ${port}`));
});