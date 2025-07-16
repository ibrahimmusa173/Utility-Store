// routes/user.routes.js
module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const router = require("express").Router();

    // Create a new User
    router.post("/", users.create);

    // Retrieve all Users
    router.get("/", users.findAll);

    // Retrieve a single User with id
    router.get("/:id", users.findOne);

    // Update a User with id
    router.put("/:id", users.update);

    // Delete a User with id
    router.delete("/:id", users.delete);

    // All your user routes will be prefixed with /api/users
    app.use('/api/users', router);
};