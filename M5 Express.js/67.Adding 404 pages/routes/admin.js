const express = require("express");

const router = express.Router();

router.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/cart" method="POST"><input type="text" name="title"><button type="submit">Send</button></form>'
  );
});

router.post("/cart", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
