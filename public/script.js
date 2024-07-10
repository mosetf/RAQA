document.addEventListener('DOMContentLoaded', () => {
/**
 * Handles the response from an HTTP request.
 * @param {Response} response - The response object from the HTTP request.
 * @returns {Promise<any>} - A promise that resolves to the parsed JSON response.
 * @throws {Error} - If the response is not OK or if there is an error parsing the response.
 */
  async function handleResponse(response) {
    if (!response.ok) {
        if (response.status === 500) {
            console.error('Server error (500): The server encountered an internal error.');
        }
        let errorData;
        try {
            const contentType = response.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Received non-JSON response');
            }

            errorData = await response.json();
            console.error('Error Data:', errorData);
            throw new Error(errorData.message || 'An error occurred');
        } catch (parseError) {
            console.error('Parse Error:', parseError);
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
              console.error('Error during registration:', error);
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
              const response = await fetch('https://raqa.onrender.com/api/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData),
              });
              const data = await handleResponse(response);
              alert('Login successful!');
              window.location.href = '/dashboard.html';
          } catch (error) {
              console.error('Error during login:', error);
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
              alert('Password reset link sent to your email');
          } catch (error) {
              console.error('Error during forgot password:', error);
              alert(error.message);
          }
      });
  }

  if (resetPasswordForm) {
      resetPasswordForm.addEventListener('submit', async (event) => {
          event.preventDefault();

          const formData = {
              password: resetPasswordForm.password.value,
              confirmPassword: resetPasswordForm.confirmPassword.value,
              token: new URLSearchParams(window.location.search).get('token'),
          };

          try {
              const response = await fetch('/api/reset_password', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData),
              });
              const data = await handleResponse(response);
              alert('Password has been reset successfully');
              resetPasswordForm.reset();
              window.location.href = '/login.html';
          } catch (error) {
              console.error('Error during reset password:', error);
              alert(error.message);
          }
      });
  }
});
