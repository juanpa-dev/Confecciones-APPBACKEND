module.exports = {
    HOST: "confeccionesapp.czwwvekl5msz.us-east-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "rootconfeccionesapp",
    DB: "confeccionesappingweb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};