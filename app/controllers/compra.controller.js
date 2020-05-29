const db = require("../models");
const Compra = db.compra;
const ItemCompra = db.itemCompra;
const Producto = db.producto
const ProductoAlmacen = db.productoAlmacen
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
    try {
        let itemCompra = req.body.itemCompra
        let itemsCompras = []
        let compra = await Compra.create({
            neto: req.body.neto,
            fecha: req.body.fecha,
            userid: req.body.userid,
            almacenId: req.body.almacenid
        })
        for (let i in itemCompra) {
            itemCompra[i].compraid = compra.id
            var item = await ItemCompra.create(itemCompra[i])
            itemsCompras.push(item)
            var producto = await Producto.findOne({
                where: { referencia: itemCompra[i].productoid }
            })
            var productoAlmacen = await ProductoAlmacen.findOne({
                where: { almacenid: req.body.almacenid, productoid: producto.referencia }
            })
            if (!productoAlmacen) {
                productoAlmacen = await ProductoAlmacen.create({
                    almacenid: req.body.almacenid,
                    productoid: producto.referencia,
                    cantidad: 0
                })
            }
            producto.cantidadDisponible = producto.cantidadDisponible + itemCompra[i].cantidad
            producto = await producto.save()
            productoAlmacen.cantidad = productoAlmacen.cantidad + itemCompra[i].cantidad
            productoAlmacen = await productoAlmacen.save()
        }
        compra.dataValues.itemCompra = itemsCompras
        return res.json(compra);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}
exports.delete = async (req, res) => {
    try {
        let compra = await Compra.findOne({
            where: { id: req.params.id }
        })
        let itemCompra = await ItemCompra.findAll({
            where: { compraid: req.params.id }
        })
        for (let i in itemCompra) {
            var producto = await Producto.findOne({
                where: { referencia: itemCompra[i].productoid }
            })
            var productoAlmacen = await ProductoAlmacen.findOne({
                where: { almacenid: compra.almacenId, productoid: producto.referencia }
            })
            producto.cantidadDisponible = producto.cantidadDisponible - itemCompra[i].cantidad
            producto = await producto.save()
            productoAlmacen.cantidad = productoAlmacen.cantidad - itemCompra[i].cantidad
            productoAlmacen = await productoAlmacen.save()
        }
        compra.dataValues.itemCompra = itemCompra
        await compra.destroy()
        return res.send({ message: "Se elimino la compra identificada por el id: " + compra.id });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}
exports.deleteItem = async (req, res) => {
    try {
        let itemCompra = await ItemCompra.findOne(
            {
                where: { compraid: req.body.compraid, productoid: req.body.productoid }
            }
        )
        let compra = await Compra.findOne(
            {
                where: { id: req.body.compraid }
            }
        )
        let producto = await Producto.findOne(
            {
                where: { referencia: req.body.productoid }
            }
        )
        var productoAlmacen = await ProductoAlmacen.findOne(
            {
                where: { almacenid: compra.almacenId, productoid: req.body.productoid }
            }
        )
        producto.cantidadDisponible = producto.cantidadDisponible - itemCompra.cantidad
        producto = await producto.save()
        productoAlmacen.cantidad = productoAlmacen.cantidad - itemCompra.cantidad
        productoAlmacen = await productoAlmacen.save()
        compra.neto = compra.neto - itemCompra.precioNeto
        compra = await compra.save()
        await itemCompra.destroy()
        return res.send({ message: "Se elimino el producto de la compra identificada por el id: " + itemCompra.productoid });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}
exports.deleteAll = async (req, res) => {
    try {
        let itemCompra = await ItemCompra.findAll({
        })
        for (let i in itemCompra) {
            var producto = await Producto.findOne({
                where: { referencia: itemCompra[i].productoid }
            })
            var productoAlmacen = await ProductoAlmacen.findAll({
                where: { productoid: producto.referencia }
            })
            producto.cantidadDisponible = 0
            producto.precioVenta = 0
            producto = await producto.save()
            for (let y in productoAlmacen) {
                productoAlmacen[y].cantidad = 0
                productoAlmacen[y] = await productoAlmacen[y].save()
            }


        }
        await Compra.destroy({ truncate: { cascade: true } })
        return res.send({ message: "Se elimino todas las compras" });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}
exports.findById = async (req, res) => {
    try {
        let compra = await Compra.findOne({
            where: { id: req.params.id }
        })
        let itemCompra = await ItemCompra.findAll({
            where: { compraid: req.params.id }
        })
        compra.dataValues.itemCompra = itemCompra
        return res.json(compra);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}
exports.findByFecha = async (req, res) => {
    try {
        let itemCompra = []
        let startDate = req.body.startDate
        let endDate = req.body.endDate
        let compra = await Compra.findAll({
            where: {
                fecha: {
                    [Op.between]: [startDate, endDate]
                }
            }
        })
        for (let i in compra) {
            itemCompra = await ItemCompra.findAll({
                where: { compraid: compra[i].id }
            })
            compra[i].dataValues.itemCompra = itemCompra
        }
        return res.json(compra)
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}
exports.findByUser = async (req, res) => {
    try {
        let compra = await Compra.findAll({
            where: { userid: req.params.user }
        })
        for (let i in compra) {
            itemCompra = await ItemCompra.findAll({
                where: { compraid: compra[i].id }
            })
            compra[i].dataValues.itemCompra = itemCompra
        }

        return res.json(compra);
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}
exports.findAll = async (req, res) => {
    try {
        let itemCompra = []
        let compra = await Compra.findAll({})
        for (let i in compra) {
            itemCompra = await ItemCompra.findAll(
                {
                    where: { compraid: compra[i].id }
                }
            )
            compra[i].dataValues.itemCompra = itemCompra
        }
        return res.json(compra)
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}
exports.findByProducto = async (req, res) => {
    try {
        let compra = []
        let itemCompra = await ItemCompra.findAll(
            {
                where: { productoid: req.params.id }
            }
        )
        for (let i in itemCompra) {
            var c = await Compra.findOne(
                {
                    where: { id: itemCompra[i].compraid }
                }
            )
            c.dataValues.itemCompra = await ItemCompra.findAll(
                {
                    where: { compraid: c.dataValues.id }
                }
            )
            compra.push(c)
        }
        return res.json(compra)
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}
exports.update = async (req, res) => {
    try {
        let item = req.body.itemCompra
        let compra = await Compra.findOne({
            where: { id: req.body.id }
        })
        var itemCompra
        compra.neto = req.body.neto
        compra.fecha = req.body.fecha
        compra.userid = req.body.userid
        for (let i in item) {
            itemCompra = await ItemCompra.findOne(
                {
                    where: { compraid: compra.id, productoid: item[i].productoid }
                }
            )
            var producto = await Producto.findOne(
                {
                    where: { referencia: item[i].productoid }
                }
            )
            var productoAlmacen = await ProductoAlmacen.findOne(
                {
                    where: { almacenid: compra.almacenId, productoid: producto.referencia }
                }
            )
            producto.cantidadDisponible = producto.cantidadDisponible - itemCompra.cantidad + item[i].cantidad
            producto = await producto.save()
            productoAlmacen.cantidad = productoAlmacen.cantidad - itemCompra.cantidad + item[i].cantidad
            productoAlmacen = await productoAlmacen.save()
            itemCompra.precioUnitario = item[i].precioUnitario
            itemCompra.cantidad = item[i].cantidad
            itemCompra.precioNeto = item[i].precioNeto
            itemCompra = itemCompra.save()
        }
        compra = await compra.save()
        compra.dataValues.itemCompra = await ItemCompra.findAll(
            {
                where: { compraid: compra.id }
            }
        )
        return res.json(compra)
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
}