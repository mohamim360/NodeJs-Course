const express = require("express");

const router = express.Router();

const path = require('path');

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname,'../','views','add-product.html'));
});
//  you can use .. instant of ../

//  /admin/add-product =>Post
router.post("/add-product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
