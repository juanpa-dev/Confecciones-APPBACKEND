module.exports = (sequelize, Sequelize) => {
    const Almacen = sequelize.define("almacen", {
        name: {
            type: Sequelize.STRING
        },
        administrador: {
            type: Sequelize.STRING
        }
    });

    return Almacen;
};