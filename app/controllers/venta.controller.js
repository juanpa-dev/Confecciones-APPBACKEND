const db = require("../models");
const venta = db.venta;
const ItemVenta = db.itemVenta;

exports.create = (req, res) => {

    const { neto, fecha, userid, almacenid } = req.body
    console.log(neto)
    let promesas = []

    venta.create({ neto: neto, fecha: fecha, userid: userid, almacenid: almacenid })
        .then(venta => {
            let itemVenta = req.body.itemVenta
            itemVenta.forEach(item => {
                item.ventaid = venta.id;
                let p = ItemVenta.create(item);
                promesas.push(p);
            });
            Promise.all(promesas)
                .then(() => {
                    venta.dataValues.itemVenta = promesas;
                    return res.json(venta);
                })
                .catch(err => {
                    return res.status(500).send({ message: `${err.message} + no se pudieron crear los items` });
                });
        })
        .catch(err => {
            return res.status(500).send({ message: `${err.message} + no se pudo crear la venta` });
        });



};