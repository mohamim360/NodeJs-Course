const express = require("express");

const path = require("path");

const router = express.Router();

const adminController = require('../controllers/admin')



router.get("/add-product",adminController.getAddProducts);


router.get('/products',adminController.AddProducts)

router.post("/add-product",adminController.postAddProducts);

router.get("/edit-product/:productId",adminController.getEditProducts);

router.post("/edit-product");

module.exports = router

