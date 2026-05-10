const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

// --- UPDATED CORS CONFIGURATION ---
app.use(cors({
  origin: [
    "https://utility-store.vercel.app", // Your Vercel URL
    "http://localhost:5173"             // Your Local Development URL
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make uploads folder public
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require("./routes/auth.routes.js");
const productRoutes = require("./routes/product.routes.js");

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});