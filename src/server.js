const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('./config/config');
const app = express();
const db = require('../database/database');

db();


app.set('llave', config.llave);


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.listen(3000, () => {
    console.log('Servidor corriendo por el puerto 3000');
});

app.get('/', function(req, res) {
    res.send('Inicio');
})