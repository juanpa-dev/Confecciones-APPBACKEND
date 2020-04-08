module.exports = {
    HOST: "localhost:3306",
    USER: "pabloweb",
    PASSWORD: "root",
    DB: "confeccionesappingweb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};