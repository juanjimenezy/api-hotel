const express = require('express');
const router = express.Router();
const reservasController = require('../Controllers/reservas.controller.js');
const LoginController = require('../Controllers/login.controller.js');

router.get('/reservas',LoginController.tokenVerify,reservasController.getReservas);
router.get('/reserva/:id',LoginController.tokenVerify,reservasController.getReserva);
router.post('/reserva',LoginController.tokenVerify,reservasController.postReserva);
router.put('/reserva/:id',LoginController.tokenVerify,reservasController.putReserva);
router.delete('/reserva/:id',LoginController.tokenVerify,reservasController.deleteReserva);

module.exports = router;