const express = require("express");

const router = express.Router();

//we can repeat the path here because we got different methods, get and post, so these will be two different routes too

//  /admin/add-product =>GET
router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/admin/add-product" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>'
  );
});

router.post("/add-product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
