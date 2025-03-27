// frontend/src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Replace the following with your actual login API call if needed.
    console.log('Logging in with:', { email, password });
    // For demonstration, we simply navigate to home.
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {message && <p className="auth-message">{message}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
