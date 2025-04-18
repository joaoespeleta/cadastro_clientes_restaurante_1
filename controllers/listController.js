const db = require('../models/db');

// Lista de usuários
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, name, email, cep FROM users2');
    res.json(users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ error: err.message });
  }
};

// Lista de restaurantes
exports.getAllRestaurants = async (req, res) => {
  try {
    const [rests] = await db.query('SELECT id, name, email, cep FROM restaurants2');
    res.json(rests);
  } catch (err) {
    console.error('Erro ao buscar restaurantes:', err);
    res.status(500).json({ error: err.message });
  }
};
