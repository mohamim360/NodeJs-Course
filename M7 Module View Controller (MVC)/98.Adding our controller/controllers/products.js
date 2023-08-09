
const Product =require('../models/product')

exports.getAddProducts = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProducts = (req, res) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.addProducts = (req, res, next) => {
  const products = Product.fetchAll()
  res.render("shop", {
	 prods: products, 
	 pageTitle: "shop",
	 path: "/" });
};
