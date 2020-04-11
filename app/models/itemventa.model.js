module.exports = (sequelize, Sequelize) => {
    const ItemVenta = sequelize.define("itemVenta", {
        precioUnitario: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        precioNeto: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        ventaid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        productoid: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            allowNull: false,
        }
    });

    return ItemVenta;
}