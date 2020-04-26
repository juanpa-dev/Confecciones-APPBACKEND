const db = require("../models")
const productoAlmacen = db.productoAlmacen;
const producto = db.producto;

exports.create = (req, res) => {
    const { cantidad, almacenid, productoid } = req.body
    productoAlmacen.create({ cantidad: cantidad, almacenid: almacenid, productoid: productoid })
        .then(producto => {
            return res.json(producto);
        })
        .catch(err => {
            return res.status(500).send({ err: err });
        });
};

exports.findProducByAlm = (req, res) => {
    let promesas = []
    let cantidades = []
    console.log("params", req.params.id)
    productoAlmacen.findAll({
        where: { almacenid: req.params.id }
    })
        .then(productosAlmacen => {
            productosAlmacen.forEach(result => {
                prodAlma = result.dataValues;
                cantidades.push(prodAlma.cantidad) //Cantidadde productos en el almaen consultado
                let p = producto.findAll({
                    where: { referencia: prodAlma.productoid },
                });
                promesas.push(p);
            });
            Promise.all(promesas)
                //Actualizar el campo cantidad de acuerdo al almacen.
                .then((resultado) => {
                    let i = 0;
                    let cantActual;
                    cantActual = resultado.map(producto => {
                        producto[0].cantidadDisponible = cantidades[i];
                        i++;
                        return producto
                    });
                    return res.json(cantActual);
                })
                .catch(err => {
                    return res.status(500).send({ message: `${err.message} + no se pudo crear los items` });
                });

        })
        .catch(err => {
            return res.status(500).send({ err: err });
        });
};


exports.update = (req, res) => {
    p = req.body;
    producto.update(
        {
            nombre: p.nombre,
            marca: p.marca,
            modelo: p.modelo,
            cantidadDisponible: p.cantidadDisponible,
            precioVenta: p.precioVenta
        },
        { where: { referencia: req.params.referencia } }
    )
        .then(producto => {
            return res.json(producto);
        })
        .catch(err => {
            return res.status(500).send({ message: err.message })
        })
}

exports.findAll = (req, res) => {
    producto.findAll({
    })
        .then(productos => {
            return res.json(productos)
        })
        .catch(err => {
            return res.status(500).send({ message: err.message })
        });
}



