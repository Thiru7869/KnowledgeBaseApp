import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    password: '',
    role: 'Client',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Account created for ${formData.firstName} as ${formData.role}`);
    localStorage.setItem('user', JSON.stringify(formData));
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <Link to="/login" className="back-btn">← Back</Link>
        <div className="login-logo">🌐 LOGO</div>
      </div>

      <h2>Create Your Account</h2>

      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label>Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>User Type</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="Client">Client</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignupPage;
