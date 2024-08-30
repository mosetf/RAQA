import React, { useState, useEffect } from 'react';
import './QuotesWidget.css';

const QuotesWidget = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch('/api/user/quotes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const result = await response.json();
        setQuotes(result.quotes);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="quotes-widget">
      <h2>Your Quotes</h2>
      {quotes.length > 0 ? (
        <ul>
          {quotes.map((quote, index) => (
            <li key={index}>{quote}</li>
          ))}
        </ul>
      ) : (
        <p>No quotes available.</p>
      )}
    </div>
  );
};

export default QuotesWidget;
