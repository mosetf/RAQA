document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const getQuoteBtn = document.getElementById('get-quote-btn');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
      username: registerForm.username.value,
      email: registerForm.email.value,
      password: registerForm.password.value,
    };

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration');
    }
  });

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

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = {
    email: loginForm.email.value,
    password: loginForm.password.value,
  };

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    // Handle login success or failure based on data
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during login');
  }
});