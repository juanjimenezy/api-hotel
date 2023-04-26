const express = require('express');
const router = express.Router();
const HabitacionesController = require('../Controllers/habitaciones.controller.js')

router.get('/habitaciones', HabitacionesController.getHabitaciones);
router.get('/habitacion/:id', HabitacionesController.getHabitacion);
router.post('/habitacion', (req,res) => { HabitacionesController.postHabitacion(req,res)});
router.delete('/habitacion/:id', HabitacionesController.deleteHabitacion);

module.exports = router;