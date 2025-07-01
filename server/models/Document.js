const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  visibility: { type: String, enum: ['public', 'private'], default: 'private' },
  lastModified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', documentSchema);
// This model defines the structure of a document in the knowledge base.