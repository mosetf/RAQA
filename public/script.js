document.addEventListener('DOMContentLoaded', function() {
  // Toggle between sign-in and sign-up forms
  document.querySelector('.img__btn').addEventListener('click', function() {
    document.querySelector('.cont').classList.toggle('s--signup');
  });

  // Password visibility toggle
  document.getElementById('toggle-sign-in-password').addEventListener('click', function() {
    togglePasswordVisibility('sign-in-password', 'toggle-sign-in-password');
  });
  document.getElementById('toggle-sign-up-password').addEventListener('click', function() {
    togglePasswordVisibility('sign-up-password', 'toggle-sign-up-password');
  });

  // Handle sign-in form submission
  document.getElementById('sign-in-submit').addEventListener('click', async function() {
    const email = document.getElementById('sign-in-email').value;
    const password = document.getElementById('sign-in-password').value;

    if (!validateEmail(email)) {
      showError('sign-in-email-error', 'Invalid email format');
      return;
    }

    const data = { email, password };

    try {
      const response = await fetch('/api/login', {
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
    const confirmPassword = document.getElementById('sign-up-confirm-password').value;

    if (!validateEmail(email)) {
      showError('sign-up-email-error', 'Invalid email format');
      return;
    }

    const passwordStrength = checkPasswordStrength(password);
    if (!passwordStrength.valid) {
      showError('sign-up-password-strength', passwordStrength.message);
      return;
    }

    if (password !== confirmPassword) {
      showError('sign-up-confirm-password-error', 'Passwords do not match');
      return;
    }

    const data = { username: name, email, password };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to sign up. Please try again later.');
      }

      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing up. Please try again later.');
    }
  });

  function togglePasswordVisibility(passwordFieldId, toggleButtonId) {
    const passwordField = document.getElementById(passwordFieldId);
    const toggleButton = document.getElementById(toggleButtonId);
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    toggleButton.textContent = type === 'password' ? '👁️' : '🙈';
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }

  function checkPasswordStrength(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!hasUpperCase) {
      return { valid: false, message: 'Password must include at least one uppercase letter' };
    }
    if (!hasLowerCase) {
      return { valid: false, message: 'Password must include at least one lowercase letter' };
    }
    if (!hasNumbers) {
      return { valid: false, message: 'Password must include at least one number' };
    }
    if (!hasSpecialChar) {
      return { valid: false, message: 'Password must include at least one special character' };
    }

    return { valid: true, message: 'Strong password' };
  }

  function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
  }
});
