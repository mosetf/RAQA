import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const checkPasswordStrength = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(signInEmail)) {
      alert('Invalid email format');
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: signInEmail, password: signInPassword })
      });
      const result = await response.json();
      alert(result.message);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while signing in.');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(signUpEmail)) {
      alert('Invalid email format');
      return;
    }

    if (!checkPasswordStrength(signUpPassword)) {
      alert('Password does not meet requirements');
      return;
    }

    if (signUpPassword !== signUpConfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: signUpName, email: signUpEmail, password: signUpPassword })
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
  };

  return (
    <div className={`cont ${isSignup ? 's--signup' : ''}`}>
      <div className="form sign-in">
        <h2>Welcome</h2>
        <label>
          <span>Email</span>
          <input
            type="email"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            className="input-field"
          />
          <span id="sign-in-email-error" className="error-message"></span>
        </label>
        <label>
          <span>Password</span>
          <div className="password-wrapper">
            <input
              type="password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <span id="sign-in-password-error" className="error-message"></span>
        </label>
        <Link to="/forgot-password" id="forgot-password-link">Forgot Password?</Link>
        <button type="button" className="submit" onClick={handleSignInSubmit}>
          Sign In
        </button>
      </div>
      <div className="sub-cont">
        <div className="img">
          <div className="img__text m--up">
            <h3>Don't have an account? Please Sign up!</h3>
          </div>
          <div className="img__text m--in">
            <h3>If you already have an account, just sign in.</h3>
          </div>
          <div className="img__btn" onClick={toggleForm}>
            <span className="m--up">Sign Up</span>
            <span className="m--in">Sign In</span>
          </div>
        </div>
        <div className="form sign-up">
          <h2>Create your Account</h2>
          <label>
            <span>Name</span>
            <input
              type="text"
              value={signUpName}
              onChange={(e) => setSignUpName(e.target.value)}
              className="input-field"
            />
          </label>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              className="input-field"
            />
            <span id="sign-up-email-error" className="error-message"></span>
          </label>
          <label>
            <span>Password</span>
            <div className="password-wrapper">
              <input
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="input-field"
              />
            </div>
          </label>
          <ul id="password-requirements">
            <li id="length-requirement">At least 8 characters long</li>
            <li id="uppercase-requirement">At least one uppercase letter</li>
            <li id="lowercase-requirement">At least one lowercase letter</li>
            <li id="number-requirement">At least one number</li>
            <li id="special-requirement">At least one special character</li>
          </ul>
          <label>
            <span>Confirm Password</span>
            <input
              type="password"
              value={signUpConfirmPassword}
              onChange={(e) => setSignUpConfirmPassword(e.target.value)}
              className="input-field"
            />
            <span id="sign-up-confirm-password-error" className="error-message"></span>
          </label>
          <button type="button" className="submit" onClick={handleSignUpSubmit}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
