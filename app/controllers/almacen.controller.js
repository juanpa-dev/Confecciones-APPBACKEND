const db = require("../models")
const almacen = db.almacen;

exports.create = (req, res) => {
    const { name, userid } = req.body
    almacen.create({ name: name, userid: userid })
        .then(almacen => {
            return res.json(almacen);
        })
        .catch(err => {
            return res.status(500).send({ err: err });
        });
};

exports.findAll = async (req, res) => {
    almacen.findAll({})
        .then(almacenes => {
            return res.json(almacenes)
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
}

exports.findById = (req, res) => {
    almacen.findAll({
        where: { id: req.params.id }
    })
        .then(almacen => {
            console.log(almacen)
            return res.json(almacen)
        })
        .catch(err => {
            return res.status(500).send({ message: `${err.message} + no se encotraron los items` })
        })
}

exports.findByUserid = (req, res) => {
    almacen.findAll({
        where: { userid: req.params.id }
    })
        .then(almacenes => {
            return res.json(almacenes)
        })
        .catch(err => {
            return res.status(500).send({ message: `${err.message} + no se encotraron los items` })
        })
}