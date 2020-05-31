module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        enable: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        avatar: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    return User;
};