const controller = require("../controllers/producto.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/producto", controller.create); 
    app.get("/api/productos", controller.findAll);
    app.put("/api/producto", controller.update);
    app.get("/api/producto/:referencia", controller.findById);
}