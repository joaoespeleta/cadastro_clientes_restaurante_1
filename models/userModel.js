const db = require('./db');

exports.createUser = ({ name, email, passwordHash }) =>
  db.query(
    'INSERT INTO users2 (name, email, password) VALUES (?, ?, ?)',
    [name, email, passwordHash]
  );

exports.findUserByEmail = email =>
  db.query('SELECT * FROM users2 WHERE email = ?', [email])
    .then(([rows]) => rows[0]);

exports.findUserById = id =>
  db.query('SELECT id, name, email, created_at FROM users2 WHERE id = ?', [id])
    .then(([rows]) => rows[0]);
