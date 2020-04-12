const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Compra = db.compra;
const ItemCompra = db.itemCompra;
const Producto = db.producto;
const Almacen = db.almacen;

exports.register = (req, res) => {
    let promise=[]
    Compra.create({
        neto: req.body.neto,
        fecha: req.body.fecha,
        userid: req.body.userid
    })
        .then((compra) => {
            var itemCompra = req.body.itemCompra
            for (let i in itemCompra) {
                itemCompra[i].compraid = compra.id
                var p = ItemCompra.create(itemCompra[i])
                promise.push(p)
            }
            Promise.all(promise).then(() => {
                return res.send({ message: "Compra was create successfully!" });
            })
                .catch(err => {
                    return res.status(500).send({ message: err.message });
                });
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });

}
