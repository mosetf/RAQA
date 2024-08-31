import React, { useEffect, useState } from 'react';
import './UserPage.css';

const UserPage = () => {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/quote', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const result = await response.json();
      setQuote(result.quote);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setError('Failed to load quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="user-page">
      <div className="top-bar">
        <h1>Welcome to the User Page</h1>
        <button onClick={() => window.location.href = '/dashboard'} className="dashboard-button">
          Dashboard
        </button>
      </div>
      <div className="quote-section">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="quote-container">
            <p className="quote">"{quote}"</p>
            {/* If you have a quote author, you can add it here */}
            {/* <p className="author">- {author}</p> */}
          </div>
        )}
        <button onClick={fetchQuote} className="refresh-button">Get Another Quote</button>
      </div>
    </div>
  );
};

export default UserPage;