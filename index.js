const express = require('express');
const app = express();
const server_port = 8080;

app.use(express.json());

//Routes
const routesHabitaciones = require('./src/Routes/habitaciones.routes.js');
const routesReservas = require('./src/Routes/reservas.routes.js');
const routesLogin = require('./src/Routes/login.routes.js')
app.use(routesHabitaciones);
app.use(routesReservas);
app.use(routesLogin);
//

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req,res) => {
    res.status(404).json({
        message:'Ruta no encontrada.'
    });
});

app.listen(server_port, () => { console.log("Server Start! "); });