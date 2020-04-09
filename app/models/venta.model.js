module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define("venta", {
        date: {
            type: Sequelize.DATE
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        precio: {
            type: Sequelize.FLOAT
        },
        netoParcial: {
            type: Sequelize.FLOAT
        }
    });

    return Venta;
};