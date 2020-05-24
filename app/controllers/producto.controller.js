const db = require("../models")
const producto = db.producto;

exports.create = (req, res) => {
    const { referencia, nombre, marca, modelo, estado, cantidadDisponible, precioVenta } = req.body
    producto.create({
            referencia: referencia.toUpperCase(),
            nombre: nombre,
            marca: marca,
            modelo: modelo,
            estado: estado,
            cantidadDisponible: cantidadDisponible,
            precioVenta: precioVenta
        })
        .then(producto => {
            return res.json(producto);
        })
        .catch(err => {
            return res.status(500).send({ err: err });
        });
};

exports.findById = (req, res) => {
    let id = req.params.referencia
    producto.findAll({
            where: { referencia: id.toUpperCase() }
        })
        .then(producto => {
            return res.json(producto)
        })
        .catch(err => {
            return res.status(500).send({ message: `$(err.message) + No se encontró el producto` })
        });
};


exports.update = (req, res) => {
    p = req.body;
    producto.update({
            nombre: p.nombre,
            marca: p.marca,
            modelo: p.modelo,
            cantidadDisponible: p.cantidadDisponible,
            precioVenta: p.precioVenta
        }, { where: { referencia: p.referencia } })
        .then(producto => {
            return res.json(producto);
        })
        .catch(err => {
            return res.status(500).send({ message: err.message })
        })
}

exports.findAll = (req, res) => {
    producto.findAll({})
        .then(productos => {
            return res.json(productos)
        })
        .catch(err => {
            return res.status(500).send({ message: err.message })
        });
}