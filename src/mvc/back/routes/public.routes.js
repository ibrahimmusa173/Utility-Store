// src/mvc/back/routes/public.routes.js

module.exports = app => {
    // We can reuse the same controller logic from user.controller.js
    const users = require("../controllers/user.controller.js");
    const router = require("express").Router();

    // This route is public and does NOT use the verifyToken middleware.
    // It will be accessible at http://localhost:7000/api/public/users
    router.get("/users", users.findAll);

    // All routes in this file will be prefixed with /api/public
    app.use('/api/public', router);
};