import React, { useState } from 'react';
import '../App.css';
import { auth, provider, githubProvider } from '../firebase';
import {
  signInWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();

      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(userCredential.user));
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const token = await result.user.getIdToken();
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(result.user));
        alert(`Welcome ${result.user.displayName}`);
        navigate('/');
      })
      .catch((err) => {
        console.error('Google Login Error:', err);
        alert('Google login failed!');
      });
  };

  const githubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then(async (result) => {
        const token = await result.user.getIdToken();
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(result.user));
        alert(`Welcome ${result.user.displayName}`);
        navigate('/');
      })
      .catch((err) => {
        console.error('GitHub Login Error:', err);
        alert('GitHub login failed!');
      });
  };

  const createAccount = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    const emailPrompt = window.prompt('Enter your registered email:');
    if (emailPrompt) {
      sendPasswordResetEmail(auth, emailPrompt)
        .then(() => {
          alert('Password reset email sent. Please check your inbox.');
        })
        .catch((error) => {
          console.error('Reset Error:', error);
          alert('Failed to send reset email. Make sure the email is registered.');
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <Link to="/" className="back-btn">← Back</Link>
        <div className="login-logo">🌐 LOGO</div>
      </div>

      <h2>Login to Your Account</h2>

      <form onSubmit={handleLoginSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <button
            type="button"
            className="link-button"
            onClick={handleForgotPassword}
            style={{ color: '#007bff', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit">Login</button>
      </form>

      <div className="divider">OR</div>

      <div className="social-icons-row">
        <button className="social-icon google" onClick={googleLogin}>
          <img src="https://cdn-icons-png.flaticon.com/512/300/300221.png" alt="Google" />
        </button>
        <button className="social-icon github" onClick={githubLogin}>
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" />
        </button>
      </div>

      <p className="register-link">
        Don’t have an account?{' '}
        <button className="link-button" onClick={createAccount}>Create one</button>
      </p>
    </div>
  );
}

export default LoginPage;
