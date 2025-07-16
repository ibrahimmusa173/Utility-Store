// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse requests of content-type - application/x-www-form-urlencoded

// A simple test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the user management API." });
});

// Require and initialize the user routes
// This is the correct way to integrate your routes file
require("./routes/user.routes.js")(app);

// Set port and start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});