const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductFromFile = (cb) => {
 

  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    }
    else{
    cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
   getProductFromFile(products =>{
    products.push(this);
    fs.writeFile(p, JSON.stringify(products), (err) => {
      console.log(err);
    });
   })

   
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }
};

/*Asynchronous Behavior: Due to the asynchronous nature of fs.readFile, the return statements within the callback won't have any effect on the outer function. The outer function will complete execution before the callback is even executed, and as a result, the return values won't be captured or used.*/
