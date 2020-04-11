module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define("venta", {
        id: {
            type: Sequelize.INTEGER(5),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        neto: {
            type: Sequelize.INTEGER
        },
        fecha: {
            type: Sequelize.DATE
        }
    });

    return Venta;
};