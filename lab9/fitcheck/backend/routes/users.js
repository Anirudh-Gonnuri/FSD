const express = require('express');
const router = express.Router();
const db = require('../db');
const upload = require('../utils/multerConfig');
const sendRegistrationEmail = require('../utils/mailer');

router.post('/register', upload.single('profile_picture'), (req, res) => {
  const { name, email, phone } = req.body;
  const profile_picture = req.file ? req.file.path : null;

  db.query(
    'INSERT INTO users (name,email,phone,profile_picture) VALUES (?,?,?,?)',
    [name, email, phone, profile_picture],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      sendRegistrationEmail(email, name);
      res.json({ id: result.insertId, name, email, phone, profile_picture });
    }
  );
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

router.put('/:id', upload.single('profile_picture'), (req, res) => {
  const { name, email, phone } = req.body;
  const profile_picture = req.file ? req.file.path : null;
  const { id } = req.params;

  const query = profile_picture
    ? 'UPDATE users SET name=?, email=?, phone=?, profile_picture=? WHERE id=?'
    : 'UPDATE users SET name=?, email=?, phone=? WHERE id=?';

  const values = profile_picture
    ? [name, email, phone, profile_picture, id]
    : [name, email, phone, id];

  db.query(query, values, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User updated' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM users WHERE id=?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User deleted' });
  });
});

module.exports = router;
