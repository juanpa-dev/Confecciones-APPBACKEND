module.exports = (sequelize, Sequelize) => {
    const Venta = sequelize.define("venta", {
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
        // almacenid: {
        //     type: Sequelize.INTEGER,
        //     primaryKey:true
        // },
        // userid: {
        //     type: sequelize.INTEGER,
        //     primaryKey: true
        // }
    });

    return Venta;
};