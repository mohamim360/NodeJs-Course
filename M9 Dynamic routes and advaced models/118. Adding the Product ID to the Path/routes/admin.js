const express = require("express");

const path = require("path");

const router = express.Router();

const adminController = require('../controllers/admin')



router.get("/add-product",adminController.getAddProducts);

// /admin/products => GET
router.get('/products',adminController.AddProducts)

router.post("/add-product",adminController.postAddProducts);

module.exports = router

