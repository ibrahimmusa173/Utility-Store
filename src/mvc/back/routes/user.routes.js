const verifyToken = require("../middleware/auth.middleware.js");

module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const router = require("express").Router();

    // The user creation route is now /api/auth/register.
    // We remove the public POST route from here.
    // router.post("/", users.create);

    // ALL ROUTES BELOW ARE NOW PROTECTED
    // A valid token must be provided in the header to access them.
    router.get("/", [verifyToken], users.findAll);
    router.get("/:id", [verifyToken], users.findOne);
    router.put("/:id", [verifyToken], users.update);
    router.delete("/:id", [verifyToken], users.delete);

    // All protected routes are prefixed with /api/users
    app.use('/api/users', router);
};