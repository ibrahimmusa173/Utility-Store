require('dotenv').config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors({
  origin: [
    "https://utility-store.vercel.app",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
const authRoutes = require("./routes/auth.routes.js");
const productRoutes = require("./routes/product.routes.js");

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});