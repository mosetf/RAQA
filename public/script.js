document.addEventListener('DOMContentLoaded', function() {
    // Toggle between sign-in and sign-up forms
    document.querySelector('.img__btn').addEventListener('click', function() {
      document.querySelector('.cont').classList.toggle('s--signup');
    });
  
    // Handle sign-in form submission
    document.getElementById('sign-in-submit').addEventListener('click', async function() {
      const email = document.getElementById('sign-in-email').value;
      const password = document.getElementById('sign-in-password').value;
  
      const data = { email, password };
  
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while signing in.');
      }
    });
  
    // Handle sign-up form submission
    document.getElementById('sign-up-submit').addEventListener('click', async function() {
      const name = document.getElementById('sign-up-name').value;
      const email = document.getElementById('sign-up-email').value;
      const password = document.getElementById('sign-up-password').value;
  
      const data = { name, email, password };
  
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        const result = await response.json();
        alert(result.message);
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while signing up.');
      }
    });
  });