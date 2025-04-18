const db = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Registro de usuário
exports.registerUser = async (req, res) => {
    try {
      const { name, email, password, cep } = req.body;
  
      // Validação simples
      if (!name || !email || !password || !cep) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }
  
      // Gera hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Inserção no banco
      await db.query(
        'INSERT INTO users2 (name, email, password, cep) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, cep]
      );
  
      res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      res.status(500).json({ message: 'Erro interno ao registrar usuário' });
    }
  };

// Registro de restaurante
exports.registerRestaurant = async (req, res) => {
    try {
      const { name, email, password, cep } = req.body;
  
      // Validação simples
      if (!name || !email || !password || !cep) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }
  
      // Gera hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Inserção no banco
      await db.query(
        'INSERT INTO restaurants2 (name, email, password, cep) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, cep]
      );
  
      res.status(201).json({ message: 'Restaurante registrado com sucesso.' });
  
    } catch (error) {
      console.error('Erro ao registrar restaurante:', error);
  
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Email já está em uso.' });
      }
  
      res.status(500).json({ message: 'Erro interno ao registrar restaurante' });
    }
  };


// Login (usuário ou restaurante)
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }
  
    try {
      // Tenta encontrar usuário
      const [userRows] = await db.query('SELECT * FROM users2 WHERE email = ?', [email]);
      if (userRows.length > 0) {
        return verificarSenha(userRows[0], password, 'cliente', res);
      }
  
      // Se não for usuário, tenta restaurante
      const [restRows] = await db.query('SELECT * FROM restaurants2 WHERE email = ?', [email]);
      if (restRows.length > 0) {
        return verificarSenha(restRows[0], password, 'restaurante', res);
      }
  
      return res.status(401).json({ message: 'Email não encontrado.' });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ message: 'Erro interno no login.' });
    }
  };
  
  // Função auxiliar para verificar senha e gerar token
  async function verificarSenha(user, password, role, res) {
    try {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({ message: 'Senha incorreta.' });
      }
  
      const token = jwt.sign(
        { id: user.id, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );
  
      return res.json({ message: 'Login bem-sucedido.', token });
    } catch (error) {
      console.error('Erro ao verificar senha:', error);
      return res.status(500).json({ message: 'Erro ao verificar senha.' });
    }
  }
