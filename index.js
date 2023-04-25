const express = require('express');
const pool = require('./bd')
const app = express();
const server_port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.get('/habitaciones', async (req, res) => {
    pool.query('SELECT * FROM habitaciones', (error, resultados) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
        } else {
            console.log('Resultados:', resultados);
            res.json(resultados);
        }
    });
});

app.get('/habitacion/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(`SELECT * FROM habitaciones WHERE id = ${id}`, (error, resultados) => {
        if (error) {
            console.error('Error al realizar la consulta:', error);
        } else {
            console.log('Resultados:', resultados);
            res.json(resultados);
        }
    });
});


app.post('/habitacion', async (req, res) => {
    let habitacion = {
        numero: req.body.numero,
        tipo: req.body.tipo,
        valor: req.body.valor
    };
    console.log(req.body);
    await pool.query('INSERT INTO habitaciones SET ?', habitacion, (error, resultado) => {
        if (error) {
            console.error('Error al ejecutar el insert:', error);
        } else {
            console.log('Se insertó un nuevo usuario con el ID:', resultado.insertId);
            res.send(`{${resultado.insertId}`);
        }
    });
});


app.delete('/habitacion/:id', async (req, res) => {
    const id = req.params.id;
    await pool.query(`DELETE FROM habitaciones WHERE id = ?`, id, (error, resultado) => {
        if (error) {
            console.error('Error al ejecutar el insert:', error);
        } else {
            console.log('Se insertó un nuevo usuario con el ID:', resultado.insertId);
            res.send(`{${resultado.insertId}`);
        }
    });

});


app.listen(server_port, () => { console.log("Server Start! "); });