module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        referencia: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        brand: {
            type: Sequelize.STRING
        },
        model: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        }

    });

    return Producto;
};