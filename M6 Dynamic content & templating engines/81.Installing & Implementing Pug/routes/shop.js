const express = require("express");

const path = require('path');

const rootDir = require('../utilities/path')

const adminData = require('./admin')

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render('shop');
});


module.exports = router;

