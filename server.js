require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;

async function getQuote(){
    try {
        //const apikey = process.env.QUOTES_REST_API_KEY;
        const response = await axios.get('https://api.quotable.io/quotes/random'//,{
           // headers: {
                //'Authorization': `Bearer ${apikey}`
           // }
        //}
    );
        const data = response.data;
        const quoteText = data.content;
        const quoteAuthor = data.author;
        return{ quoteText, quoteAuthor};
    }catch(error) {
        console.error(error);
        return{ quoteText:'Error fetching quote', quoteAuthor: ""};
    }
}

app.get('/api/quote', async (req, res) => {
    const quote = await getQuote();
    res.json(quote);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));