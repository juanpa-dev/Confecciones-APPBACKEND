module.exports = {
    HOST: "confeccionesappdb.ccw8ocfn0bga.us-east-1.rds.amazonaws.com",
    PORT: "3306",
    USER: "admin",
    PASSWORD: "confeccionesroot",
    DB: "confeccionesappingweb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};