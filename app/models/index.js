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
db.compra = require("../models/compra.model.js")(sequelize, Sequelize);
db.almacen = require("../models/almacen.model.js")(sequelize, Sequelize);
db.itemCompra = require("../models/itemcompra.model.js")(sequelize, Sequelize);
db.itemVenta = require("../models/itemventa.model.js")(sequelize, Sequelize);
db.productoAlmacen = require("../models/productoAlmacen.model.js")(sequelize, Sequelize);



//Role -> user_roles <- User
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

//User -> venta
db.user.hasMany(db.venta, {
    foreignKey: {
        name: 'userid',
        allowNull: false,
    }
});

db.venta.belongsTo(db.user, {
    foreignKey: 'userid'
});


//User -> compra

db.user.hasMany(db.compra, {
    foreignKey: {
        name: 'userid',
        allowNull: false,
    }
});

db.compra.belongsTo(db.user, {
    foreignKey: 'userid'
});



//venta -> itemVenta

db.venta.belongsToMany(db.producto, {
    through: db.itemVenta,
    foreignKey: { name:'ventaid', allowNull: false },
    otherKey: "productoid"

});

db.producto.belongsToMany(db.venta, {
    through: db.itemVenta,
    foreignKey: { name:'productoid', allowNull: false },
    otherKey: "ventaid"
})

//producto -> itemVenta

db.compra.belongsToMany(db.producto, {
    through: db.itemCompra,
    foreignKey: { name: 'compraid', allowNull: false },
    otherKey: "productoid"
});

db.producto.belongsToMany(db.compra, {
    through: db.itemCompra,
    foreignKey: { name: 'productoid',allowNull: false },
    otherKey: 'compraid'
})

// almacen -> venta
db.almacen.hasMany(db.venta, {
    foreignKey: {
        name: 'almacenid',
        allowNull: false,
    }
});

db.venta.belongsTo(db.almacen, {
    foreignKey: {
        name: 'almacenid',
        allowNull: false
    }
});
//almacen -> user

db.almacen.belongsTo(db.user, {
    foreignKey: {
        name:'userid',
        allowNull: false
    }
});

//producto -> almacen


db.producto.belongsToMany(db.almacen, {
    through: db.productoAlmacen,
    foreignKey: { name: 'prodcutoid', allowNull: false },
    otherKey: "almacenid"
});

db.almacen.belongsToMany(db.producto, {
    through: db.productoAlmacen,
    foreignKey: { name: 'almacenid', allowNull: false },
    otherKey: 'productoid'
})



module.exports = db;