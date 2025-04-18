const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

router.get('/users', listController.getAllUsers);
router.get('/restaurants', listController.getAllRestaurants);

module.exports = router;
