const db = require('./db');

exports.createRestaurant = ({ name, address }) =>
  db.query(
    'INSERT INTO restaurants2 (name, address) VALUES (?, ?)',
    [name, address]
  );

exports.findRestaurantById = id =>
  db.query('SELECT * FROM restaurants2 WHERE id = ?', [id])
    .then(([rows]) => rows[0]);
