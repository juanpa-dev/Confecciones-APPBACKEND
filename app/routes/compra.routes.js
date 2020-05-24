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

    app.post("/api/compra", [authJwt.verifyToken, authJwt.isUserOrAdmin], controller.create);
    app.delete("/api/compra/id/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.delete);
    app.delete("/api/compra/item", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteItem);
    app.delete("/api/compra/", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteAll);
    app.get("/api/compra/fecha/", [authJwt.verifyToken, authJwt.isUserOrAdmin], controller.findByFecha);
    app.get("/api/compra/id/:id", [authJwt.verifyToken, authJwt.isUserOrAdmin], controller.findById);
    app.get("/api/compra/user/:user", [authJwt.verifyToken, authJwt.isUserOrAdmin], controller.findByUser);
    app.get("/api/compra/producto/:id", [authJwt.verifyToken, authJwt.isUserOrAdmin], controller.findByProducto);
    app.get("/api/compra", [authJwt.verifyToken, authJwt.isUserOrAdmin], controller.findAll);
    app.put("/api/compra", [authJwt.verifyToken, authJwt.isUserOrAdmin], controller.update);
}