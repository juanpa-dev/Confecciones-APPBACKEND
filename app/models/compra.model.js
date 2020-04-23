module.exports = (sequelize, Sequelize) => {
    const Compra = sequelize.define("compra", {
        id: {
            type: Sequelize.INTEGER(5),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        neto: {
            type: Sequelize.FLOAT,
            allowNull: false,
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false,
        }
    });

    return Compra;
};