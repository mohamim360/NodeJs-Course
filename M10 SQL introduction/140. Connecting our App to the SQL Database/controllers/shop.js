const Product = require("../models/product");
const Cart = require("../models/cart");

exports.addProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "shop",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodID = req.params.productId;
  Product.findById(prodID)
    .then(([product]) =>  {
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));

    /*promises are used to manage the asynchronous flow of the database query and rendering process. The findById method returns a promise that resolves with the query result, and the .then() method is used to handle that result. If there's an error at any step, it's caught using the .catch() method and logged to the console. This approach makes the code more readable and maintainable compared to deeply nested callbacks.

*/
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const carProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (carProductData) {
          cartProducts.push({ productData: product, qty: carProductData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};
/* there is a potential race condition. If the Cart.deleteProduct or Product.findById functions are asynchronous (which is likely, considering they involve database operations), the redirect might occur before those operations have finished, leading to incorrect behavior.

To avoid this potential issue and ensure proper execution, it's generally safer to place the redirect inside the callback function, as shown in the first snippet. This way, you ensure that the redirect only happens once the necessary operations are completed.*/
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
