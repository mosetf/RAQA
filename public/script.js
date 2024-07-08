document.addEventListener('DOMContentLoaded', () => {
  async function handleResponse(response) {
    if (!response.ok) {
      let errorData;
      try {
        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Received non-JSON response');
        }

        errorData = await response.json();
        console.error('Error Data:', errorData); // Log the error data for debugging
        throw new Error(errorData.message || 'An error occurred');
      } catch (parseError) {
        console.error('Parse Error:', parseError); // Log the parse error for debugging
        // This could be a network error, or the response is not JSON
        throw new Error(errorData?.message || parseError.message || 'An error occurred while parsing the response');
      }
    }
    return response.json();
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
        if (data.success) {
          alert(data.message || 'Login successful');
          loginForm.reset();
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.message); 
      }
    });
  }

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const data = { email };

      fetch('/api/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
        alert(data.message || 'Password has been reset successfully');
        resetPasswordForm.reset();
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while resetting the password');
      }
    });
  }
});
