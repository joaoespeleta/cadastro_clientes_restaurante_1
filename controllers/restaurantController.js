const { createRestaurant, findRestaurantById } = require('../models/restaurantModel');

exports.registerRestaurant = async (req, res) => {
  const { name, address } = req.body;
  try {
    const [result] = await createRestaurant({ name, address });
    res.status(201).json({ message: 'Restaurante registrado', restaurantId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  const { id } = req.params;
  const rest = await findRestaurantById(id);
  if (!rest) return res.status(404).json({ error: 'Restaurante não encontrado' });
  res.json(rest);
};
