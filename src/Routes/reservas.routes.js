const express = require('express');
const router = express.Router();
const reservasController = require('../Controllers/reservas.controller.js')

router.get('/reservas',reservasController.getReservas);
router.get('/reserva/:id',reservasController.getReserva);
router.post('/reserva',reservasController.postReserva);
router.delete('/reserva/:id',reservasController.deleteReserva);

module.exports = router;