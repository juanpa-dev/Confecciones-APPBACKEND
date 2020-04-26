module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
        referencia: {
            type: Sequelize.STRING,
            primaryKey: true,
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

    }, 
    { indexes: [{unique: true, fields: ["referencia"]}]});


    return Producto;
};