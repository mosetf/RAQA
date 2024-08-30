import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [quotes, setQuotes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('/api/quotes');
        setQuotes(response.data);
      } catch (error) {
        setErrorMessage('Error fetching quotes');
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="home-page-container">
      <h1>Welcome to the Quotes Page</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <div className="quotes-container">
        {quotes.map((quote, index) => (
          <div key={index} className="quote">
            <p>{quote.text}</p>
            <span>- {quote.author}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;