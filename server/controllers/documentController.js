const Document = require('../models/Document');

// List documents with optional search query
exports.listDocuments = async (req, res) => {
  const { search } = req.query;
  const filter = {};

  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [{ title: regex }, { content: regex }];
  }

  const docs = await Document.find(filter)
    .populate('author', 'email')
    .sort({ updatedAt: -1 });

  const result = docs.map(d => ({
    id: d._id,
    title: d.title,
    author: d.author.email,
    lastModified: d.updatedAt,
    visibility: d.visibility,
  }));

  res.json(result);
};

// Create new document
exports.createDocument = async (req, res) => {
  const { title, content, visibility } = req.body;
  const doc = new Document({ title, content, visibility, author: req.user.id });
  await doc.save();
  res.status(201).json({ id: doc._id });
};

// Get a document
exports.getDocument = async (req, res) => {
  const doc = await Document.findById(req.params.id).populate('author', 'email');
  if (!doc) return res.status(404).json({ msg: 'Not found' });
  res.json(doc);
};

// Update document (auto-save supported)
exports.updateDocument = async (req, res) => {
  const { content, title, visibility } = req.body;
  const doc = await Document.findById(req.params.id);
  if (!doc) return res.status(404).json({ msg: 'Not found' });

  if (req.user.id !== doc.author.toString()) {
    return res.status(403).json({ msg: 'Permission denied' });
  }

  doc.title = title ?? doc.title;
  doc.content = content ?? doc.content;
  doc.visibility = visibility ?? doc.visibility;
  await doc.save();

  res.json({ msg: 'Updated' });
};
