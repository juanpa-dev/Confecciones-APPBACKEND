module.exports = (sequelize, Sequelize) => {
    const Compra = sequelize.define("compra", {
        id: {
            type: Sequelize.INTEGER(5),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        neto: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        fecha: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        almacenId:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    return Compra;
};