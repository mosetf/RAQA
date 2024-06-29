require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const routes = require('./routes/routes');

const app = express();

const port = process.env.PORT || 3000;

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
app.use('/', routes);

app.listen(port, () => console.log(`Server listening on port ${port}`));
