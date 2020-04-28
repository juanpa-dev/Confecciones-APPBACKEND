module.exports = {
    HOST: "localhost",
    PORT: "3306",
    USER: "hiler",
    PASSWORD: "12345",
    DB: "confeccionesappingweb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};