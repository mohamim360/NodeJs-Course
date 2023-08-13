const Product = require("../models/product");


exports.getAddProducts = (req, res, next) => {
	res.render("admin/add-product", {
	  pageTitle: "Add Product",
	  path: "/admin/add-product",
	});
  };
  
  exports.postAddProducts = (req, res) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect("/");
  };
  
  
  exports.AddProducts = (req, res) => {
	Product.fetchAll((products) => {
		res.render("admin/products", {
		  prods: products,
		  pageTitle: "Admin Products",
		  path: "/admin/products",
		});
	  });
  };
  
