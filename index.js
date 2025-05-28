const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const RouterPath = require("./router");

const app = express();
const port = 7000;

app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: ["GET", "POST"], // Allow specific methods
    credentials: true // If you need to send cookies or auth headers
}));

app.use("/", RouterPath); // Mount router at root

app.listen(port, () => console.log(`Server running on port ${port}`));