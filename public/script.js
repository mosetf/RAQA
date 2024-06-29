document.addEventListener('DOMContentLoaded', () => {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const getQuoteBtn = document.getElementById('get-quote-btn');

  async function getQuote() {
    try {
      const response = await fetch('/api/quote');
      const data = await response.json();
      quoteText.textContent = data.quoteText;
      quoteAuthor.textContent = `- ${data.quoteAuthor}`;
    } catch (error) {
      console.error(error);
      quoteText.textContent = 'Error fetching quote';
      quoteAuthor.textContent = '';
    }
  }

  getQuoteBtn.addEventListener('click', getQuote);
});
