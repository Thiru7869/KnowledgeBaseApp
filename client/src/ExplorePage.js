import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const navigate = useNavigate();

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${encodeURIComponent(query)}&srlimit=5`;
    const res = await fetch(url);
    const json = await res.json();
    setSuggestions(
      json.query.search.map(item => ({
        title: item.title,
        snippet: item.snippet,
      }))
    );
  };

  const fetchPageDetails = async (title) => {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(url);
    const json = await res.json();
    setSelectedPage(json);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);
    fetchSuggestions(query);
  };

  const handleSelect = (title) => {
    setSearchTerm(title);
    setSuggestions([]);
    fetchPageDetails(title);
  };

  return (
    <div className="explore-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">📘 WikiDictionary</div>
        <nav className="sidebar-links">
          <Link to="/">🏠 Home</Link>
          <Link to="/post">✍️ Post</Link>
          <Link to="/login">🔑 Login</Link>
          <Link to="/services">🛠️ Services</Link>
          <Link to="/help">❓ Help</Link>
        </nav>
      </aside>

      <main className="explore-main">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: '#eee',
            padding: '8px 14px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '15px'
          }}
        >
          ← Back
        </button>

        <div className="search-bar-top">
          <input
            type="text"
            placeholder="Search the wiki..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map(s => (
                <li key={s.title} onClick={() => handleSelect(s.title)}>
                  <strong>{s.title}</strong> –{' '}
                  <span dangerouslySetInnerHTML={{ __html: s.snippet }} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedPage && (
          <div className="wiki-card">
            <h2>{selectedPage.title}</h2>
            {selectedPage.thumbnail?.source && (
              <img
                src={selectedPage.thumbnail.source}
                alt={selectedPage.title}
                style={{ maxWidth: '200px', margin: '10px 0' }}
              />
            )}
            <p>{selectedPage.extract}</p>
            <a
              href={selectedPage.content_urls.desktop.page}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#007bff' }}
            >
              Read more on Wikipedia
            </a>
          </div>
        )}
      </main>
    </div>
  );
}

export default ExplorePage;
