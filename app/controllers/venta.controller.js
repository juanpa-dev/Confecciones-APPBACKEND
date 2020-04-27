const db = require("../models");
const venta = db.venta;
const ItemVenta = db.itemVenta;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const { referencia, neto: neto, fecha, userid, almacenid } = req.body
    let promesas = []

    venta.create({ referencia: referencia, neto: neto, fecha: fecha, userid: userid, almacenid: almacenid })
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
                    return res.status(500).send({ message: `${err.message} + no se pudo crear los items` });
                });
        })
        .catch(err => {
            return res.status(500).send({ message: `${err.message} + no se pudo crear la venta` });
        });
};


exports.findById = (req, res) => {
    venta.findOne({
        where: { id: req.params.id }
    })
        .then(venta => {
            ItemVenta.findAll({
                where: { ventaid: req.params.id }
            })
                .then(itemCVenta => {
                    venta.dataValues.itemVenta = itemCVenta
                    return res.json(venta)
                })
                .catch(err => {
                    return res.status(500).send({ message: `${err.message} + no se encotraron los items` })
                })
        })
}

exports.findByFecha = (req, res) => {
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    venta.findAll({
        where: {
            fecha: {
                [Op.between]: [startDate, endDate]
            }
        }

    })
        .then(ventas => {
            return res.json(ventas)
        })
        .catch(err => {
            return res.status(500).send({ message: err.message })
        })
}