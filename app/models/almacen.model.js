module.exports = (sequelize, Sequelize) => {
    const Almacen = sequelize.define("almacen", {
        id: {
            type: Sequelize.INTEGER(5),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        // userid: {
        //     type: Sequelize.INTEGER,
        //     primaryKey: true,
        //     allowNull: false,
        // }
    });

    return Almacen;
};