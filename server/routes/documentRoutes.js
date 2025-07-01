import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../App.css';

function DocumentEditor() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState('private');
  const [content, setContent] = useState('');
  const [saveStatus, setSaveStatus] = useState('');
  const saveTimeout = useRef(null);

  const token = localStorage.getItem('token')?.replace(/"/g, '');

  useEffect(() => {
    if (!token) {
      alert('Please login first.');
      navigate('/login');
    }
  }, [navigate, token]);

  const saveDraft = useCallback(async () => {
    if (!token) {
      setSaveStatus('Please login to auto-save.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, visibility, content }),
      });

      if (res.ok) {
        setSaveStatus('Draft auto-saved');
      } else {
        const data = await res.json();
        setSaveStatus('Auto-save failed: ' + (data.error || res.statusText));
      }
    } catch (error) {
      setSaveStatus('Auto-save error: ' + error.message);
    }
  }, [title, content, visibility, token]);

  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      if (title || content) {
        saveDraft();
      }
    }, 10000);
    return () => clearTimeout(saveTimeout.current);
  }, [title, content, visibility, saveDraft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveStatus('Saving document...');

    if (!token) {
      alert('Please login first.');
      setSaveStatus('');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, visibility, content }),
      });

      if (response.ok) {
        alert('Document saved successfully!');
        setSaveStatus('');
        navigate('/explore');
      } else {
        const data = await response.json();
        alert('Error saving document: ' + (data.error || response.statusText));
        setSaveStatus('');
      }
    } catch (error) {
      alert('Error saving document: ' + error.message);
      setSaveStatus('');
    }
  };

  const clearForm = () => {
    setTitle('');
    setContent('');
    setVisibility('private');
    setSaveStatus('');
  };

  return (
    <div className="editor-container">
      <h2>Create a New Document</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="editor-input"
        />

        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="editor-input"
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>

        <ReactQuill
          value={content}
          onChange={setContent}
          className="editor-quill"
          placeholder="Start writing your document here..."
        />
        <div style={{ marginTop: '5px', fontSize: '0.9em', color: '#555' }}>
          Character count: {content.replace(/<[^>]+>/g, '').length}
        </div>

        <div style={{ marginTop: '10px', minHeight: '24px', color: 'green' }}>
          {saveStatus}
        </div>

        <button type="submit" className="editor-save-btn" style={{ marginRight: '10px' }}>
          Save Document
        </button>
        <button type="button" onClick={clearForm} className="editor-clear-btn">
          Clear Form
        </button>
      </form>
    </div>
  );
}

export default DocumentEditor;
