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
            type: Sequelize.STRING,
            allowNull: false,
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
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        precioVenta: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }

    });

    return Producto;
};