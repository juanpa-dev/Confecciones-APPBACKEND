module.exports = (sequelize, Sequelize) => {
    const Compra = sequelize.define("compra", {
        id: {
            type: Sequelize.INTEGER(5),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        neto: {
            type: Sequelize.INTEGER
        },
        fecha: {
            type: Sequelize.DATE
        }
    });

    return Compra;
};