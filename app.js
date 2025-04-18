const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

require('dotenv').config();

// Conexão com banco
const db = require('./models/db');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // arquivos estáticos (HTML, CSS, JS)

// Rotas
const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

// Listar
const listRoutes = require('./routes/listRoutes');
app.use('/api', listRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
