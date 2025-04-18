const bcrypt = require('bcrypt');
const { createUser, findUserById } = require('../models/userModel');

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  try {
    const [result] = await createUser({ name, email, passwordHash });
    res.status(201).json({ message: 'Cliente registrado', userId: result.insertId });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email já está em uso' });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);
  if (!user) return res.status(404).json({ error: 'Cliente não encontrado' });
  res.json(user);
};
