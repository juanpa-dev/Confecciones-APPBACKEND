const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.producto = require("../models/producto.model.js")(sequelize, Sequelize);
db.venta = require("../models/venta.model.js")(sequelize, Sequelize);
db.almacen = require("../models/almacen.model.js")(sequelize, Sequelize);
db.factura = require("../models/factura.model.js")(sequelize, Sequelize);


db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

db.ROLES = ["user", "admin", "tercero"];

// ventas

db.producto.belongsToMany(db.venta, {
    through: "venta_producto",
    foreignKey: "productoId",
    otherKey: "ventaId"
});

db.venta.belongsToMany(db.producto, {
    through: "venta_producto",
    foreignKey: "ventaId",
    otherKey: "productoId"
});

db.user.hasMany(db.venta, {
    foreignKey: {
        name: 'user',
        allowNull: false,
    }
});

// almacens
db.almacen.hasMany(db.venta, {
    foreignKey: {
        name: 'almacen',
        allowNull: false,
    }
});

db.venta.hasMany(db.factura, {
    foreignKey: {
        name: 'venta',
        allowNull: false,
    }
});


module.exports = db;