const products = [];

exports.getAddProducts = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
  });
};

exports.postAddProducts = (req, res) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.addProducts = (req, res, next) => {
  res.render("shop", {
	 prods: products, 
	 pageTitle: "shop",
	 path: "/" });
};
