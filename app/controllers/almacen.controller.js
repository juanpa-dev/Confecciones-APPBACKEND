const db = require("../models")
const producto = db.almacen;

exports.create = (req, res) => {
    const { name, userid } = req.body
    producto.create({ name: name, userid: userid })
        .then(almacen => {
            return res.json(almacen);
        })
        .catch(err => {
            return res.status(500).send({ err: err });
        });
};