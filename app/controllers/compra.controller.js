const db = require("../models");
const Compra = db.compra;
const ItemCompra = db.itemCompra;

exports.create = (req, res) => {
    let promise = []
    Compra.create({
        neto: req.body.neto,
        fecha: req.body.fecha,
        userid: req.body.userid
    })
        .then(compra => {
            var itemCompra = req.body.itemCompra
            for (let i in itemCompra) {
                itemCompra[i].compraid = compra.id
                var p = ItemCompra.create(itemCompra[i])
                promise.push(p)
            }
            Promise.all(promise)
                .then(() => {
                    compra.dataValues.itemCompra = promise
                    return res.json(compra);
                })
                .catch(err => {
                    return res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });

}
exports.delete = (req, res) => {
    Compra.findOne({
        where: { id: req.params.id }
    })
        .then(compra => {
            ItemCompra.findAll({
                where: { compraid: req.params.id }
            })
                .then(itemCompras => {
                    Compra.destroy({
                        where: { id: req.params.id }
                    })
                        .then(() => {
                            compra.dataValues.itemCompra = itemCompras
                            return res.json(compra);
                        })
                        .catch(err => {
                            return res.status(500).send({ message: err.message });
                        });
                })
                .catch(err => {
                    return res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
}
exports.findById = (req, res) => {
    Compra.findOne({
        where: { id: req.params.id }
    })
        .then(compra => {
            ItemCompra.findAll({
                where: { compraid: req.params.id }
            })
                .then(itemCompras => {
                    compra.dataValues.itemCompra = itemCompras
                    return res.json(compra)
                })
                .catch(err => {
                    return res.status(500).send({ message: err.message })
                })
        })
}
exports.findByFecha = (req, res) => {
    let promise = []
    Compra.findAll({
        where: { fecha: req.params.fecha }
    })
        .then(compra => {
            for (let i in compra) {
                var p = ItemCompra.findAll({
                    where: { compraid: compra[i].id }
                })
                promise.push(p)
            }
            Promise.all(promise)
                .then(() => {
                    for (let i in compra) {
                        compra[i].dataValues.itemCompra = promise[i]._rejectionHandler0
                    }
                    return res.json(compra)
                })
                .catch(err => {
                    return res.status(500).send({ message: err.message })
                })
        })
}
exports.findByUser = (req, res) => {
    let promise = []
    Compra.findAll({
        where: { userid: req.params.user }
    })
        .then(compra => {
            for (let i in compra) {
                var p = ItemCompra.findAll({
                    where: { compraid: compra[i].id }
                })
                promise.push(p)
            }
            Promise.all(promise)
                .then(() => {
                    for (let i in compra) {
                        compra[i].dataValues.itemCompra = promise[i]._rejectionHandler0
                    }
                    return res.json(compra)
                })
                .catch(err => {
                    return res.status(500).send({ message: err.message })
                })
        })
}
exports.findAll = (req, res) => {
    let promise = []
    Compra.findAll({
    })
        .then(compra => {
            for (let i in compra) {
                var p = ItemCompra.findAll({
                    where: { compraid: compra[i].id }
                })
                promise.push(p)
            }
            Promise.all(promise)
                .then(() => {
                    for (let i in compra) {
                        compra[i].dataValues.itemCompra = promise[i]._rejectionHandler0
                    }
                    return res.json(compra)
                })
                .catch(err => {
                    return res.status(500).send({ message: err.message })
                })
        })
}
exports.findByProducto = (req, res) => {
    ItemCompra.findAll({
        where: { productoid: req.params.id }
    })
        .then(productos => {
            return res.json(productos)
        })
        .catch(err => {
            return res.status(500).send({ message: err.message })
        })
}
exports.update = (req, res) => {
}
