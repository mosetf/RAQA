require('dotenv').config();
const express = require('express');
const axios = require('axios');
c

const app = express();

const port = process.env.PORT || 3000;

async function getQuote(){
    try {
        const response = await axios.get('https://api.quotable.io/quotes/random');
        const data = response.data;
        const quoteText = data.content;
        const quoteAuthor = data.author;
        console.log({ quoteText, quoteAuthor});
    }catch(error) {
        console.error(error);
        return{ quoteText:'Error fetching quote', quoteAuthor: ""};
    }
}

app.get('/api/quote', async (req, res) => {
    const quote = await getQuote();
    console.log(quote)
    res.json(quote);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => console.log(`Server listening on port ${port}`));