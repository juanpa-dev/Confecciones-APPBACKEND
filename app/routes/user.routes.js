const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/confeccionesapp/all", controller.allAccess);

    app.get(
        "/api/confeccionesapp/user", [authJwt.verifyToken],
        controller.userBoard
    );

    app.get(
        "/api/confeccionesapp/tercero", [authJwt.verifyToken, authJwt.isTercero],
        controller.terceroBoard
    );

    app.get(
        "/api/confeccionesapp/admin", [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};