// client/src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import ExplorePage from './ExplorePage';
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import ServicesPage from './pages/ServicesPage';
import HelpPage from './pages/HelpPage';
import SignupPage from './pages/SignupPage';
import DocumentEditor from './pages/DocumentEditor'; // ✅ Ensure this file exists

function Home({ searchTerm, setSearchTerm }) {
  const [user, setUser] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  const handleInputChange = async (value) => {
    setSearchTerm(value);
    setSelectedArticle(null);

    if (value.trim()) {
      try {
        const res = await fetch(
          `https://en.wikipedia.org/w/api.php?action=opensearch&search=${value}&limit=5&origin=*`
        );
        const data = await res.json();
        setSuggestions(data[1] || []);
      } catch (err) {
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchWikipediaSummary = async (term) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`
      );
      const data = await res.json();
      setSelectedArticle(data);
    } catch (err) {
      setSelectedArticle(null);
    }
  };

  const handleSelectSuggestion = (word) => {
    setSearchTerm(word);
    setSuggestions([]);
    fetchWikipediaSummary(word);
  };

  return (
    <div className="App">
      <header className="header-section">
        <div className="top-bar">
          <div className="logo">🌐 LOGO</div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Wikipedia..."
              value={searchTerm}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && searchTerm.trim()) {
                  handleSelectSuggestion(searchTerm);
                }
              }}
            />
            {suggestions.length > 0 && (
              <ul className="suggestion-list">
                {suggestions.map((word, index) => (
                  <li key={index} onClick={() => handleSelectSuggestion(word)}>
                    {word}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {user ? (
            <button className="login logout-btn" onClick={handleLogout}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
                alt="Logout"
                className="logout-icon"
              />
              Logout
            </button>
          ) : (
            <Link to="/login" className="login">Login</Link>
          )}
        </div>

        <nav className="nav-icons">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore</Link>
          <Link to="/post">Post Your Experience</Link>
          <Link to="/create-document">Create Document</Link>
          <Link to="/services">Services</Link>
          <Link to="/help">Help</Link>
        </nav>
      </header>

      <section className="dictionary-section">
        <h1>Wiki Search</h1>
        <p>
          Search and get instant results from Wikipedia. Perfect for quick knowledge discovery.
        </p>

        {selectedArticle && (
          <div className="wiki-result">
            <h2>{selectedArticle.title}</h2>
            <p>{selectedArticle.extract}</p>
            {selectedArticle.thumbnail && (
              <img
                src={selectedArticle.thumbnail.source}
                alt={selectedArticle.title}
                className="wiki-image"
              />
            )}
            <a href={selectedArticle.content_urls.desktop.page} target="_blank" rel="noreferrer">
              Read full article on Wikipedia
            </a>
          </div>
        )}
      </section>

      <section className="explore-section">
        <p>Discover, Learn, and Share your ideas and information.</p>
        <Link to="/explore">
          <button>Explore More</button>
        </Link>
      </section>

      <section className="reviews-section">
        <h3>What people say</h3>
        <div className="reviews-container">
          <div className="review-card"><p>⭐⭐⭐⭐⭐</p><p>“A helpful tool for learning and collaboration.”</p></div>
          <div className="review-card"><p>⭐⭐⭐⭐⭐</p><p>“The best knowledge-sharing platform I've used so far!”</p></div>
          <div className="review-card"><p>⭐⭐⭐⭐⭐</p><p>“Simple UI with powerful tools. Great for teams.”</p></div>
        </div>
      </section>

      <section className="info-section">
        <h3>This platform empowers everyone to explore and share knowledge with ease.</h3>
        <div className="info-grid">
          <div className="info-card">
            <h4>For Knowledge Seekers</h4>
            <ul>
              <li>Search and explore a growing knowledge base.</li>
              <li>Access community-verified insights.</li>
              <li>Bookmark and save useful posts.</li>
              <li>Use advanced search to find exact answers.</li>
              <li>Get recommendations based on interests.</li>
            </ul>
          </div>
          <div className="info-card">
            <h4>For Contributors</h4>
            <ul>
              <li>Post your experiences and insights easily.</li>
              <li>Edit and improve your existing posts.</li>
              <li>Engage with others through comments (coming soon).</li>
              <li>Track performance and feedback on your posts.</li>
              <li>Build your contributor profile.</li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Dictionary Management Platform</p>
      </footer>
    </div>
  );
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        <Route path="/explore" element={<ExplorePage searchTerm={searchTerm} />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-document" element={<DocumentEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
