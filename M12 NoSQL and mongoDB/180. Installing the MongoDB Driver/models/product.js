const getDb = require("../utilities/database").getDb;
const mongodb = require("mongodb");
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const db = getDb();
    return db.collection("products")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  static fetchAll() {
    const db = getDb();
    return db.collection("products")
    .find()
    .toArray()
    .then(products => {
      console.log(products);
      return products;
    })
    .catch(err => {
      console.log(err);
    })
  }

  static findById(prodID) {
    const db = getDb();
    return db.collection("products")
    .find({_id : new mongodb.ObjectId(prodID) })
    .next()
    .then(product => {
      console.log(product);
      return product;
    })
    .catch(err => {
      console.log(err);
    })
  }

}

module.exports = Product;
