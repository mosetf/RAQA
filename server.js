require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const routes = require('./routes/routes');
const passport = require('passport');
const connectDB = require('./config/db'); // Import the connectDB function

const app = express();
const port = process.env.PORT || 3000;

/**
 * Retrieves a random quote from the 'https://api.quotable.io/quotes/random' API.
 * @returns {Promise<{quoteText: string, quoteAuthor: string}>} The quote text and author.
 */
async function getQuote() {
    try {
        const response = await axios.get('https://api.quotable.io/quotes/random');
        const data = response.data[0];
        return { quoteText: data.content, quoteAuthor: data.author };
    } catch (error) {
        console.error(error);
        return { quoteText: 'Error fetching quote', quoteAuthor: "" };
    }
}

app.get('/api/quote', async (req, res) => {
    const quote = await getQuote();
    res.json(quote);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', routes);

connectDB().then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
});