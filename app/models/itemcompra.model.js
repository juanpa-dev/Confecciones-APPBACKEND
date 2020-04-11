module.exports = (sequelize, Sequelize) => {
    const ItemCompra = sequelize.define("itemCompra", {
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

    return ItemCompra;
}