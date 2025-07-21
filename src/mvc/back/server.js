// src/mvc/back/server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 7000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the user management API." });
});

// Import and use routes
require("./routes/auth.routes.js")(app);
require("./routes/public.routes.js")(app); // This line requires the file you just created
require("./routes/user.routes.js")(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});