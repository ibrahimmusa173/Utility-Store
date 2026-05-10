const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();

// --- UPDATED CORS CONFIGURATION ---
// This allows your Vercel frontend to talk to this Railway backend
app.use(cors({
    origin: [
    'https://your-app.vercel.app',  // your actual Vercel URL
    'http://localhost:3000',         // for local dev
    'http://localhost:5173'          // Vite dev server
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- HEALTH CHECK ROUTE ---
// If you visit your Railway URL in a browser, you should see this message
app.get("/", (req, res) => {
  res.json({ message: "Utility Store Backend is running successfully!" });
});

const authRoutes = require("./routes/auth.routes.js");
const productRoutes = require("./routes/product.routes.js");
const userRoutes = require("./routes/user.routes.js");

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Railway automatically provides a PORT variable
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});