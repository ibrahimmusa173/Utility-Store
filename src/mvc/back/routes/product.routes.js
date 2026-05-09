const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const products = require("../controllers/product.controller.js");
const verifyToken = require('../middleware/auth.middleware.js');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/mvc/back/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

router.get("/", products.findAll);
router.get("/:id", products.findOne);
router.post("/", [verifyToken, upload.single('image')], products.create);
router.put("/:id", [verifyToken, upload.single('image')], products.update);
router.delete("/:id", [verifyToken], products.delete);

module.exports = router;