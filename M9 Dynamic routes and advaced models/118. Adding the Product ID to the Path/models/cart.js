const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //Fetch the previous data
    let cart = { products: [], totalPrice: 0 };

    fs.readFile(p, (err, fileContent) => {
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //Analyze the cart => Find existing product

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      ); //findIndex --- returns the index (position) of the first element that passes a test

      const existingProduct = cart.products[existingProductIndex];
      //add new product/ increase quantity
      let updateProduct;
      if (existingProduct) {
        updateProduct = { ...existingProduct };
        updateProduct.qty = updateProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updateProduct;
      } else {
        updateProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updateProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }
};
