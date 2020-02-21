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


app.listen(5000, () => {
    console.log('Servidor corriendo por el puerto 5000');
});