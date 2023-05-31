const express = require('express');
const pool = require('../../bd.js');

const ReservasController = {};

ReservasController.getReservas = async (req, res) => {
    await pool.query('SELECT * FROM reservas', (error, resultados) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.status(400).send(error);
        } else {
            console.log('Resultados:', resultados);
            res.status(200).json(resultados);
        }
    });
};

ReservasController.getReserva = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`SELECT * FROM reservas WHERE id = ${id}`, (error, resultados) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.status(400).send(error);
        } else {
            if(resultados.length > 0) {
                console.log('Resultados:', resultados);
                res.json(resultados);
            }else{
                res.json("No se encontró reserva.");
            }
            
        }
    });
};

ReservasController.postReserva = async (req, res) => {
    let reserva = {
        id_habitacion: req.body.id_habitacion, nombre_cli: req.body.nombre_cli, telefono_cli: req.body.telefono_cli,
        fecha_reserva: req.body.fecha_reserva, fecha_entrada: req.body.fecha_entrada, fecha_salida: req.body.fecha_salida
    };
    await pool.query('INSERT INTO reservas SET ?', reserva, (error, resultado) => {
        if (error) {
            console.error('Error al ejecutar el insert:', error);
            res.status(400).send(error);
        } else {
            console.log('Se insertó un nuevo registro con el ID:', resultado.insertId);
            res.status(201).json(`id creado: ${resultado.insertId}`);
        }
    });
};

ReservasController.putReserva = async (req, res) => {
    const id = parseInt(req.params.id);
    let reserva = {
        id_habitacion: req.body.id_habitacion, nombre_cli: req.body.nombre_cli, telefono_cli: req.body.telefono_cli,
        fecha_reserva: req.body.fecha_reserva, fecha_entrada: req.body.fecha_entrada, fecha_salida: req.body.fecha_salida
    };
    await pool.query(`UPDATE reservas SET ? WHERE id = ${id}`, reserva, (error, resultado) => {
        if (error) {
            console.error('Error al actualizar:', error);
            res.status(400).send(error);
        } else {
            console.log('Se actualizó reserva con el ID:', id);
            res.json(`message: "Se actualizó reserva con el ID:${id}"`);
        }
    });
};

ReservasController.deleteReserva = async (req, res) => {
    const id = req.params.id;
    await pool.query(`DELETE FROM reservas WHERE id = ?`, id, (error, resultado) => {
        if (error) {
            console.error('Error al ejecutar el insert:', error);
            res.status(400).send(error);
        } else {
            if (resultado.affectedRows !== 0) {
                console.log('Se elimino un registro con el ID:', id);
                res.json(`message: "Se elimino el registro con el id: ${id}"`);
            } else {
                res.status(202).json('message: "No se eliminó ningun registro."');
            }
        }
    });
};

module.exports = ReservasController;