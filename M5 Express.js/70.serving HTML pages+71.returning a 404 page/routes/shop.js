const express = require("express");

const path = require('path');

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname,'../','views','shop.html'));
});
//  you can use .. instant of ../

module.exports = router;

