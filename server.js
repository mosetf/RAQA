require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

/**
 * Connects to the MongoDB database.
 * @async
 * @function connectDB
 * @throws {Error} If there is an error connecting to the database.
 * @returns {Promise<void>} A promise that resolves when the database connection is successful.
 */
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

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
app.use('/api', routes);

connectDB().then(() => {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
});
