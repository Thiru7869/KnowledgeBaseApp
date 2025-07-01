import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';

function DocumentEditor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [documents, setDocuments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [autoSaveMessage, setAutoSaveMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const savedDocs = JSON.parse(localStorage.getItem('documents')) || [];
    setDocuments(savedDocs);
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = useCallback(
    (auto = false) => {
      if (!title.trim() && !content.trim() && !imagePreview) return;

      const timestamp = new Date().toLocaleString();
      const doc = {
        id: editingId || uuidv4(),
        title,
        content,
        image: imagePreview,
        savedAt: timestamp,
      };

      const updatedDocs = editingId
        ? documents.map((d) => (d.id === editingId ? doc : d))
        : [...documents, doc];

      setDocuments(updatedDocs);
      localStorage.setItem('documents', JSON.stringify(updatedDocs));

      if (!auto) {
        setTitle('');
        setContent('');
        setImagePreview(null);
        setEditingId(null);
      }
    },
    [documents, editingId, title, content, imagePreview]
  );

  useEffect(() => {
    if (title || content) {
      const timeout = setTimeout(() => {
        handleSave(true);
        setAutoSaveMessage('Auto-saved');
        setTimeout(() => setAutoSaveMessage(''), 1500);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [title, content, handleSave]);

  const handleEdit = (doc) => {
    setTitle(doc.title);
    setContent(doc.content);
    setImagePreview(doc.image);
    setEditingId(doc.id);
  };

  const handleDelete = (id) => {
    const updated = documents.filter((doc) => doc.id !== id);
    setDocuments(updated);
    localStorage.setItem('documents', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <button
        onClick={() => navigate('/')}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to Home
      </button>

      <h2>Document Editor</h2>

      <input
        type="text"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '8px', width: '100%', marginBottom: '10px', fontSize: '16px' }}
      />

      <ReactQuill
        value={content}
        onChange={setContent}
        style={{ height: '200px' }}
      />

      {/* Space above the buttons */}
      <div style={{ marginTop: '50px' }} />

      {/* Container for image upload and save button in the same row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ cursor: 'pointer' }}
        />

        <button
          onClick={() => handleSave(false)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </div>

      {imagePreview && (
        <div style={{ margin: '10px 0' }}>
          <img
            src={imagePreview}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '4px' }}
          />
        </div>
      )}

      {autoSaveMessage && (
        <div style={{ color: 'green', marginBottom: '15px', fontWeight: '600' }}>
          {autoSaveMessage}
        </div>
      )}

      <hr style={{ margin: '30px 0' }} />

      <h3>Saved Documents</h3>
      {documents.length === 0 && <p>No documents found.</p>}
      {documents.map((doc) => (
        <div
          key={doc.id}
          style={{
            border: '1px solid #ccc',
            padding: '15px',
            marginBottom: '15px',
            borderRadius: '6px',
          }}
        >
          <h4>{doc.title}</h4>
          <div
            dangerouslySetInnerHTML={{ __html: doc.content }}
            style={{ marginBottom: '10px' }}
          />
          {doc.image && (
            <img
              src={doc.image}
              alt="Uploaded"
              style={{ maxWidth: '150px', maxHeight: '150px', marginBottom: '10px', borderRadius: '4px' }}
            />
          )}
          <p>
            <strong>Saved At:</strong> {doc.savedAt}
          </p>
          <button
            onClick={() => handleEdit(doc)}
            style={{ marginRight: '10px', padding: '6px 12px', cursor: 'pointer' }}
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(doc.id)}
            style={{ padding: '6px 12px', cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default DocumentEditor;
