const controller = require("../controllers/compra.controller");
const { authJwt } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/compra", controller.create);
    app.delete("/api/compra/id/:id", controller.delete);
    app.delete("/api/compra/item", controller.deleteItem);
    app.delete("/api/compra/", controller.deleteAll);
    app.get("/api/compra/fecha", controller.findByFecha);
    app.get("/api/compra/id/:id", controller.findById);
    app.get("/api/compra/user/:user", controller.findByUser);
    app.get("/api/compra/producto/:id", controller.findByProducto);
    app.get("/api/compra", controller.findAll);
    app.put("/api/compra", controller.update);
}