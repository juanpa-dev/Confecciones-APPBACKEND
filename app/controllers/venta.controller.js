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
    Venta.findOne({
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

        ventas.forEach(result => {
            venta = result.dataValues;
            pv = ItemVenta.findAll({
                where: { ventaid: venta.id }
            });
            promesasItems.push(pv);
        });

        items = await Promise.all(promesasItems);

        let i = 0;
        //A cada venta le agrega su lista de items
        resultado = ventas.map(venta => {
            itemsVenta = items[i];
            venta.dataValues.itemVenta = itemsVenta;
            i++;
            return venta;
        });
        return res.json(resultado);
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

exports.findByFecha = (req, res) => {
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    Venta.findAll({
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

exports.update = async (req, res) => {
    try {
        let itemsVentas = []
        var itemsNuevos = req.body.itemVenta
        var itemsViejos = await ItemVenta.findAll({
            where: {ventaid: req.body.ventaid}
        }
        )
        itemsViejos = itemsViejos
        for (let i in itemsViejos) {
            //Actualizar exitencias
            var producto = await Producto.findOne({
                where: { referencia: itemsViejos[i].productoid }
            })
            var productoAlmacen = await ProductoAlmacen.findOne({
                where: { almacenid: req.body.almacenid, productoid: producto.referencia }
            })
            producto.cantidadDisponible = producto.cantidadDisponible + itemsViejos[i].cantidad
            producto = await producto.save()
            productoAlmacen.cantidad = productoAlmacen.cantidad + itemsViejos[i].cantidad
            productoAlmacen = await productoAlmacen.save()
            //Eliminar itemVenta
            ItemVenta.destroy({
                where: {
                    ventaid: req.body.ventaid
                }
            })
        }
        //Agregar nuevos items
        for (let i in itemsNuevos) {
            itemsNuevos[i].ventaid = req.body.ventaid
            var item = await ItemVenta.create(itemsNuevos[i])
            itemsVentas.push(item)
            var producto = await Producto.findOne({
                where: { referencia: itemsNuevos[i].productoid }
            })
            var productoAlmacen = await ProductoAlmacen.findOne({
                where: { almacenid: req.body.almacenid, productoid: producto.referencia }
            })
            producto.cantidadDisponible = producto.cantidadDisponible - itemsNuevos[i].cantidad
            producto = await producto.save()
            productoAlmacen.cantidad = productoAlmacen.cantidad - itemsNuevos[i].cantidad
            productoAlmacen = await productoAlmacen.save()
        }
        let venta = await Venta.findOne({
            where: {id: req.body.ventaid}
        })
        await Venta.update({
            neto: req.body.neto
        }, {
            where: { id: req.body.ventaid }
        }).then(
            (venta) => console.log(venta)
        )
        venta.dataValues.itemVenta = itemsVentas
        venta.dataValues.neto = req.body.neto
        return res.json(venta);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}