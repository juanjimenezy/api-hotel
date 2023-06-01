const express = require('express');
const jwt = require("jsonwebtoken");

const LoginController = {};

LoginController.login = (req, res) => {
    let user = { nombre: req.body.nombre, email: req.body.email }
    jwt.sign({ user }, 'desarrolloweb2', (err, token) => {
        res.json({
            token
        })
    })
}

LoginController.verify = (req, res) => {
    jwt.verify(req.token, 'desarrolloweb2', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            res.json({
                message: "Exitoso.",
                authData
            })
        }
    })
}

LoginController.tokenVerify = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = LoginController;