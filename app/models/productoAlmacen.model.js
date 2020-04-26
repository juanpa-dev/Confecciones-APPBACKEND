module.exports = (sequelize, Sequelize) => {
    const ProductoAlmacen = sequelize.define("producto_almacen", {
        cantidad: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    });

    return ProductoAlmacen;
};