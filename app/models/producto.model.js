module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        referencia: {
            type: Sequelize.STRING
        },
        nombre: {
            type: Sequelize.STRING
        },
        marca: {
            type: Sequelize.STRING
        },
        modelo: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.STRING
        },
        cantidadDisponible: {
            type: Sequelize.INTEGER
        },
        precioVenta: {
            type: Sequelize.INTEGER
        }

    });

    return Producto;
};