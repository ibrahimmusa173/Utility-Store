// C:/Users/user/Documents/GitHub/Backend-/src/mvc/back/routes/auth.routes.js

module.exports = app => {
    const auth = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    // Route for user registration
    router.post("/register", auth.register);

    // Route for user login
    router.post("/login", auth.login);

    // --- ADDED PASSWORD RESET ROUTES ---
    router.post("/forgot-password", auth.forgotPassword);
    router.post("/reset-password/:token", auth.resetPassword);

    // This is the base path for all auth-related routes
    app.use('/api/auth', router);
};