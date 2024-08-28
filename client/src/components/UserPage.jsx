import React, { useEffect, useState } from 'react';

const UserPage = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('/api/quote', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const result = await response.json();
        setQuote(result.quote);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []);

  return (
    <div>
      <h1>Welcome to the User Page</h1>
      <p>Your quote: {quote}</p>
    </div>
  );
};

export default UserPage;