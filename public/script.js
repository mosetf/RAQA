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

  // Real-time email format validation
  document.getElementById('sign-up-email').addEventListener('input', function() {
    validateEmailInput('sign-up-email', 'sign-up-email-error');
  });

  // Real-time password strength and length validation
  document.getElementById('sign-up-password').addEventListener('input', function() {
    checkPasswordStrength('sign-up-password');
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

    if (!checkPasswordStrength('sign-up-password').valid) {
      showError('sign-up-password-error', 'Password does not meet requirements');
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

  function validateEmailInput(emailFieldId, errorFieldId) {
    const email = document.getElementById(emailFieldId).value;
    if (!validateEmail(email)) {
      showError(errorFieldId, 'Invalid email format');
    } else {
      clearError(errorFieldId);
    }
  }

  function checkPasswordStrength(passwordFieldId) {
    const password = document.getElementById(passwordFieldId).value;
    const lengthRequirement = document.getElementById('length-requirement');
    const uppercaseRequirement = document.getElementById('uppercase-requirement');
    const lowercaseRequirement = document.getElementById('lowercase-requirement');
    const numberRequirement = document.getElementById('number-requirement');
    const specialRequirement = document.getElementById('special-requirement');

    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let valid = true;

    if (password.length >= minLength) {
      lengthRequirement.classList.add('valid');
    } else {
      lengthRequirement.classList.remove('valid');
      valid = false;
    }

    if (hasUpperCase) {
      uppercaseRequirement.classList.add('valid');
    } else {
      uppercaseRequirement.classList.remove('valid');
      valid = false;
    }

    if (hasLowerCase) {
      lowercaseRequirement.classList.add('valid');
    } else {
      lowercaseRequirement.classList.remove('valid');
      valid = false;
    }

    if (hasNumbers) {
      numberRequirement.classList.add('valid');
    } else {
      numberRequirement.classList.remove('valid');
      valid = false;
    }

    if (hasSpecialChar) {
      specialRequirement.classList.add('valid');
    } else {
      specialRequirement.classList.remove('valid');
      valid = false;
    }

    return { valid };
  }

  function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
  }

  function clearError(elementId) {
    document.getElementById(elementId).textContent = '';
  }
});
