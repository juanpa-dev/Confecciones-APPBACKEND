module.exports = (sequelize, Sequelize) => {
    const ItemVenta = sequelize.define("itemVenta", {
        id: {
            type: Sequelize.INTEGER(5),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        precioUnitario: {
            type: Sequelize.FLOAT
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        precioNeto: {
            type: Sequelize.FLOAT
        }
    });

    return ItemVenta;
}