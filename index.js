const express = require('express');
const app = express();
const server_port = 8080;

app.use(express.json());

//Routes
const routes = require('./src/Routes/habitaciones.routes.js');

app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.listen(server_port, () => { console.log("Server Start! "); });