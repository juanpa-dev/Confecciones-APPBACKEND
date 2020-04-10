module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define("venta", {
        id: {
            type: Sequelize.INTEGER(5),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
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