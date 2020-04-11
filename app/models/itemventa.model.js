module.exports = (sequelize, Sequelize) => {
    const ItemVenta = sequelize.define("itemVenta", {
        precioUnitario: {
            type: Sequelize.FLOAT
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        precioNeto: {
            type: Sequelize.FLOAT
        },
        ventaid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        productoid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    });

    return ItemVenta;
}