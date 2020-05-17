const controller = require("../controllers/almacen.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/almac", controller.create);
    app.get("/api/almacen/usuario/:id", controller.findByUserid);
    app.get("/api/almac/:id", controller.findById);
    app.get("/api/almac", controller.findAll);



}