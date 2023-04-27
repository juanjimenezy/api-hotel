const express = require('express');
const pool = require('../../bd.js');

const ReservasController = {};

ReservasController.getReservas = async (req, res) => {
    await pool.query('SELECT * FROM reservas', (error, resultados) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.send(error);
        } else {
            console.log('Resultados:', resultados);
            res.json(resultados);
        }
    });
};

ReservasController.getReserva = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`SELECT * FROM reservas WHERE id = ${id}`, (error, resultados) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.send(error);
        } else {
            console.log('Resultados:', resultados);
            res.json(resultados);
        }
    });
};

ReservasController.postReserva = async (req, res) => {
    let Reserva = {id_habitacion: req.body.id_habitacion,nombre_cli: req.body.nombre_cli,telefono_cli: req.body.telefono_cli,
                    fecha_reserva: req.body.fecha_reserva,fecha_entrada: req.body.fecha_entrada,fecha_salida: req.body.fecha_salida };
    await pool.query('INSERT INTO reservas SET ?', Reserva, (error, resultado) => {
        if (error) {
            console.error('Error al ejecutar el insert:', error);
            res.send(error);
        } else {
            console.log('Se insertó un nuevo registro con el ID:', resultado.insertId);
            res.send(`id creado:${resultado.insertId}`);
        }
    });
};

ReservasController.putReserva = async (req, res) => {
    const id = parseInt(req.params.id);
    let reserva = {
        numero: req.body.numero,
        tipo: req.body.tipo,
        valor: req.body.valor
    };
    await pool.query(`UPDATE reservas SET ? WHERE id = ${id}`, reserva, (error, resultado) => {
        if (error) {
            console.error('Error al actualizar:', error);
            res.send(error);
        } else {
            console.log('Se actualizó reserva con el ID:', resultado.insertId);
            res.send(`Se actualizó reserva con el ID:${resultado.insertId}`);
        }
    });
};

ReservasController.deleteReserva = async (req, res) => {
    const id = req.params.id;
    await pool.query(`DELETE FROM reservas WHERE id = ?`, id, (error, resultado) => {
        if (error) {
            console.error('Error al ejecutar el insert:', error);
            res.send(error);
        } else {
            console.log('Se elimino un registro con el ID:', resultado);
            res.send(`${resultado.insertId}`);
        }
    });

};

module.exports = ReservasController;