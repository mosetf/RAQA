document.addEventListener('DOMContentLoaded', () => {
  async function handleResponse(response) {
    if (!response.ok) {
      // Attempt to parse error details from the response body
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred');
      } catch (parseError) {
        // If parsing fails, throw a generic error
        throw new Error('An error occurred');
      }
    }
    return response.json(); // Parse and return the body for successful responses
  }

  const registerForm = document.getElementById('register-form');
  const loginForm = document.getElementById('login-form');
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  const resetPasswordForm = document.getElementById('reset-password-form');

  if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = {
        username: registerForm.username.value,
        email: registerForm.email.value,
        password: registerForm.password.value,
      };

      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await handleResponse(response);
        alert(data.message || 'Registration successful!');
        registerForm.reset();
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
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
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await handleResponse(response);
        // Assuming the server sends back a success flag and message in data
        if (data.success) {
          alert(data.message || 'Login successful');
          loginForm.reset();
        } else {
          // If the server indicates failure but doesn't throw an error
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.message); 
      }
    });
  }

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = { email: forgotPasswordForm.email.value };

      try {
        const response = await fetch('/api/forgot_password', { 
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await handleResponse(response);
        alert(data);
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while requesting password reset');
      }
    });
  }

  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get('token');
      const formData = {
        password: resetPasswordForm.password.value,
        confirmPassword: resetPasswordForm['confirm-password'].value,
        token: token,
      };

      try {
        const response = await fetch('/api/reset_password', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await handleResponse(response);
        alert(data);
        registerForm.reset();
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while requesting password reset');
      }
    });
  }
});
