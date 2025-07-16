// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const RouterPath = require("./router");

// const app = express();
// const port = 7000;

// app.use(bodyParser.json());
// app.use(cors({
//     origin: "http://localhost:3000", // Allow requests from frontend
//     methods: ["GET", "POST",'PUT', 'DELETE'], // Allow specific methods
//     credentials: true // If you need to send cookies or auth headers
// }));

// app.use("/", RouterPath); // Mount router at root

// app.listen(port, () => console.log(`Server running on port ${port}`));


const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const RouterPath = require("./router"); // Make sure this path points to your router file

const app = express();
const port = 7000;

app.use(cors());
app.use(bodyParser.json());

// A single, clean prefix for all API routes
app.use("/api", RouterPath);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
