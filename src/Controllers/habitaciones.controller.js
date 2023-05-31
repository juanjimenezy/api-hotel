const express = require('express');
const pool = require('../../bd.js');

const HabitacionesController = {};

HabitacionesController.getHabitaciones = async (req, res) => {
    await pool.query('SELECT * FROM habitaciones', (error, resultados) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.send(error);
        } else {
            console.log('Resultados:', resultados);
            res.json(resultados);
        }
    });
};

HabitacionesController.getHabitacion = async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`SELECT * FROM habitaciones WHERE id = ${id}`, (error, resultados) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
            res.send(error);
        } else {
            if(resultados.length > 0) {
                console.log('Resultados:', resultados);
                res.json(resultados);
            }else{
                res.json("No se encontró habitación.")
            }
            
        }
    });
};

HabitacionesController.postHabitacion = async (req, res) => {
    let habitacion = {
        numero: req.body.numero,
        tipo: req.body.tipo,
        valor: req.body.valor
    };
    await pool.query('INSERT INTO habitaciones SET ?', habitacion, (error, resultado) => {
        if (error) {
            console.error('Error al ejecutar el insert:', error);
            res.send(error);
        } else {
            console.log('Se insertó una nueva habitación con el ID:', resultado.insertId);
            res.send(`id creado:${resultado.insertId}`);
        }
    });
};

HabitacionesController.putHabitacion = async (req, res) => {
    const id = parseInt(req.params.id);
    let habitacion = {
        numero: req.body.numero,
        tipo: req.body.tipo,
        valor: req.body.valor
    };
    await pool.query(`UPDATE habitaciones SET ? WHERE id = ${id}`, habitacion, (error, resultado) => {
        if (error) {
            console.error('Error al actualizar:', error);
            res.send(error);
        } else {
            console.log('Se actualizó habitación con el ID:', resultado.insertId);
            res.send(`Se actualizó habitación con el ID:${resultado.insertId}`);
        }
    });
};

HabitacionesController.deleteHabitacion = async (req, res) => {
    const id = req.params.id;
    await pool.query(`DELETE FROM habitaciones WHERE id = ?`, id, (error, resultado) => {
        if (error) {
            console.error('Error al ejecutar el insert:', error);
            res.send(error);
        } else {
            console.log('Se eliminó habitación con el ID:', resultado.insertId);
            res.send(`{${resultado.insertId}`);
        }
    });

};

module.exports = HabitacionesController;