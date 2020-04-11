module.exports = (sequelize, Sequelize) => {
    const ItemCompra = sequelize.define("itemCompra", {
        precioUnitario: {
            type: Sequelize.FLOAT
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        precioNeto: {
            type: Sequelize.FLOAT
        },
        compraid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        productoid: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }   
    });

    return ItemCompra;
}