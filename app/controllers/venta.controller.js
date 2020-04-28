const db = require("../models");
const Venta = db.venta;
const Producto = db.producto;
const ProductoAlmacen = db.productoAlmacen;
const ItemVenta = db.itemVenta;
const Op = db.Sequelize.Op;


exports.create = async (req, res) => {
    try {
        let itemVenta = req.body.itemVenta
        let itemsVentas = []
        let ventar = await Venta.create({
            neto: req.body.neto,
            fecha: req.body.fecha,
            userid: req.body.userid,
            almacenid: req.body.almacenid
        })
        for (let i in itemVenta) {
            itemVenta[i].ventaid = ventar.id
            var item = await ItemVenta.create(itemVenta[i])
            itemsVentas.push(item)
            var producto = await Producto.findOne({
                where: { referencia: itemVenta[i].productoid }
            })
            var productoAlmacen = await ProductoAlmacen.findOne({
                where: { almacenid: req.body.almacenid, productoid: producto.referencia }
            })
            producto.cantidadDisponible = producto.cantidadDisponible - itemVenta[i].cantidad
            producto = await producto.save()
            productoAlmacen.cantidad = productoAlmacen.cantidad - itemVenta[i].cantidad
            productoAlmacen = await productoAlmacen.save()
        }
        ventar.dataValues.itemVenta = itemsVentas
        return res.json(ventar);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}


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

exports.findByAlmacen = async (req, res) => {

    try {
        let resultado = []
        promesasItems = []
        let ventas = await Venta.findAll({
            where: { almacenid: req.params.id }
        })

        console.log("ventas", ventas);
        //        ventas = ventas.dataValues;
        //Items de cada venta
        ventas.forEach(result => {
            venta = result.dataValues;
            pv = ItemVenta.findAll({
                where: { ventaid: venta.id }
            });
            promesasItems.push(pv);
        });

        items = await Promise.all(promesasItems);

        let i = 0;
        resultado = ventas.map(venta => {
            item = items[i];
            item = item[0].dataValues;
            venta.itemVenta = item;
            console.log("items ***", item)
            i++;
            return venta;
        });

        console.log("ventas co", resultado)

        return res.json(resultado);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
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