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

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).send('Something went wrong');
});

connectDB().then(() => {
    app.listen(port, () => logger.info(`Server listening on port ${port}`));
});
