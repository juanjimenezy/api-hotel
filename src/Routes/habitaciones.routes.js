const express = require('express');
const router = express.Router();
const HabitacionesController = require('../Controllers/habitaciones.controller.js')
const LoginController = require('../Controllers/login.controller.js');

router.get('/habitaciones',LoginController.tokenVerify, HabitacionesController.getHabitaciones);
router.get('/habitacion/:id',LoginController.tokenVerify, HabitacionesController.getHabitacion);
router.post('/habitacion',LoginController.tokenVerify,HabitacionesController.postHabitacion);
router.put('/habitacion/:id',LoginController.tokenVerify,HabitacionesController.putHabitacion);
router.delete('/habitacion/:id',LoginController.tokenVerify, HabitacionesController.deleteHabitacion);

module.exports = router;