module.exports = {
    HOST: "146.148.41.99",
    USER: "root",
    PASSWORD: "rootconfeccionesapp",
    DB: "pruebas",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};