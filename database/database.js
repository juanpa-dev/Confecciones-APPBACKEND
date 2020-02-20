var mysql = require('mysql');

module.exports = () => {
    var connection = mysql.createConnection({
        host: '146.148.41.99',
        user: 'root',
        password: 'rootconfeccionesapp',
        database: 'CONFECCIONESAPP',
        port: 3306
    });
    connection.connect(function(error) {
        if (error) {
            throw error;
        } else {
            console.log('Conexion correcta.');
        }
    });
    connection.end();
}