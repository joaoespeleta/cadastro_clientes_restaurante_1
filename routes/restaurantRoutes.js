const express = require('express');
const router = express.Router();
const { registerRestaurant, getRestaurantById } = require('../controllers/restaurantController');

router.post('/register', registerRestaurant);
router.get('/:id', getRestaurantById);

module.exports = router;
