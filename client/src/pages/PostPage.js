import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function PostPage() {
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('posts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePost = () => {
    if (input.trim() === '') return;

    if (editingIndex !== null) {
      const updatedPosts = [...posts];
      updatedPosts[editingIndex] = input;
      setPosts(updatedPosts);
      setEditingIndex(null);
    } else {
      setPosts([input, ...posts]);
    }
    setInput('');
  };

  const handleEdit = (index) => {
    setInput(posts[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const filteredPosts = posts.filter(post =>
    post.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="post-page">
      <div className="top-bar">
        <Link to="/" className="back-btn">← Back Home</Link>
        <input
          type="text"
          className="search-input"
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="editor-section">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your experience here..."
        ></textarea>
        <button onClick={handlePost}>
          {editingIndex !== null ? 'Update Post' : 'Post'}
        </button>
      </div>

      <div className="posts-section">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, idx) => (
            <div key={idx} className="post-card">
              <p>{post}</p>
              <button onClick={() => handleEdit(idx)}>Edit</button>
              <button onClick={() => handleDelete(idx)} className="delete-btn">Delete</button>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}

export default PostPage;
