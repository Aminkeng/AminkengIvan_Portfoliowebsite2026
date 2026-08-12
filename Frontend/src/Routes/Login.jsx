// AuthPage.jsx - Updated with API calls and signup form
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import './login.css';

function AuthPage({ setIsLogin }) {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    
    if (!loginEmail || !loginPassword) {
      setErrorMessage('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const endpoint = `${API_URL}/auth/login`;
      const payload = { email: loginEmail, password: loginPassword };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(data.message || data.errors?.[0]?.msg || 'An error occurred');
        return;
      }

      const loggedInUser = data.user || data.admin;
      if (!data.token || !loggedInUser) {
        setErrorMessage('The server returned an invalid login response.');
        return;
      }

      // Store token in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify({ ...loggedInUser, role: loggedInUser.role || 'user' }));
      if (setIsLogin) setIsLogin(true);

      // Reset form on successful submission
      setLoginEmail('');
      setLoginPassword('');
      navigate(loggedInUser.role === 'admin' ? '/admindashboard' : '/home');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
    
    // Validation
    if (!signupName || !signupEmail || !signupPassword || !confirmPassword) {
      setErrorMessage('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (signupPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    if (signupPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const endpoint = `${API_URL}/auth/public-signup`;
      const payload = { name: signupName, email: signupEmail, password: signupPassword };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(data.message || data.errors?.[0]?.msg || 'An error occurred during registration');
        return;
      }

      const loggedInUser = data.user || data.admin;
      if (!data.token || !loggedInUser) {
        setErrorMessage('The server returned an invalid registration response.');
        return;
      }

      // Store token in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify({ ...loggedInUser, role: loggedInUser.role || 'user' }));
      if (setIsLogin) setIsLogin(true);

      // Reset form on successful submission
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setConfirmPassword('');
      navigate('/home');
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {isSignup ? 'Create Your Account' : 'Login to Your Account'}
        </h2>
        
        {errorMessage && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}
        
        {!isSignup ? (
          /* LOGIN FORM */
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input id="remember" type="checkbox" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className="forgot-password">Forgot password?</a>
            </div>
            
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Please wait...' : 'Login'}
            </button>
          </form>
        ) : (
          /* SIGNUP FORM */
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email Address</label>
              <input
                id="signup-email"
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
            
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Please wait...' : 'Sign Up'}
            </button>
          </form>
        )}
        
        <div className="social-login">
          <div className="divider2">
            <span>Or continue with</span>
          </div>
          
          <div className="social-buttons">
            <button className="social-button"><FaGoogle/></button>
            <button className="social-button"><FaFacebook /></button>
            <button className="social-button"><FaXTwitter /></button>
          </div>
        </div>

        <div className="auth-footer">
          <p>
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              type="button"
              className="toggle-button"
              onClick={() => {
                setIsSignup(!isSignup);
                setErrorMessage('');
              }}
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;