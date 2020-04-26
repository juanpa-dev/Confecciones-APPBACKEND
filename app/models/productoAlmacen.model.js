module.exports = (sequelize, Sequelize) => {
    const ProductoAlmacen = sequelize.define("producto_almacen", {
        cantidad: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    });

    return ProductoAlmacen;
};