module.exports = (sequelize, Sequelize) => {
    const Factura = sequelize.define("factura", {
        id: {
            type: Sequelize.INTEGER(5),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        total: {
            type: Sequelize.INTEGER
        },
        tipoFactura: {
            type: Sequelize.ENUM('venta', 'compra') },
    });

    return Factura;
};