

const Product = require("../models/product");


exports.addProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "shop",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {

    res.render("shop/cart", {
  
      pageTitle: "Your Cart",
      path: "/cart",
    });
 
};
exports.getCheckout = (req, res, next) => {
 
    res.render("shop/checkout", {
  
      pageTitle: "Checkout",
      path: "/checkout",
    });
 
};
