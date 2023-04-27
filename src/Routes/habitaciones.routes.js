const express = require('express');
const router = express.Router();
const HabitacionesController = require('../Controllers/habitaciones.controller.js')

router.get('/habitaciones', HabitacionesController.getHabitaciones);
router.get('/habitacion/:id', HabitacionesController.getHabitacion);
router.post('/habitacion',HabitacionesController.postHabitacion);
router.put('/habitacion/:id',HabitacionesController.putHabitacion);
router.delete('/habitacion/:id', HabitacionesController.deleteHabitacion);

module.exports = router;