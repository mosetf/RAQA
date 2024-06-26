document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const getQuoteBtn = document.getElementById('get-quote-btn');

  if (registerForm) {
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
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = {
        email: loginForm.email.value,
        password: loginForm.password.value,
      };

      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log('Login response:', data);

        if (data.success) {
          alert('Login successful');
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login');
      }
    });
  }

  if (getQuoteBtn) {
    getQuoteBtn.addEventListener('click', async () => {
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
    });
  }
});
