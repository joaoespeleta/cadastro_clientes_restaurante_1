const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const db = require('../models/db');

// Rotas de registro
router.post('/users/register', authController.registerUser);
router.post('/restaurants/register', authController.registerRestaurant);

// Login
router.post('/login', authController.login);

// Buscar cliente por ID
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT id, nome, email, cep FROM users2 WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar usuário' });
    if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(results[0]);
  });
});

// Buscar restaurante por ID (opcional)
router.get('/restaurants/:id', (req, res) => {
  const restId = req.params.id;
  const sql = 'SELECT id, nome, email, cep FROM restaurants2 WHERE id = ?';
  db.query(sql, [restId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar restaurante' });
    if (results.length === 0) return res.status(404).json({ error: 'Restaurante não encontrado' });
    res.json(results[0]);
  });
});

module.exports = router;
