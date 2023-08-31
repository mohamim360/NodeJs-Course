const mongo = require("mongodb");
const getDb = require("../utilities/database").getDb;

const ObjectId = mongo.ObjectId;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this_id = id;
  }

  save() {
    const db = getDb();

    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex(cp => {
    //   return cp._id === product._id;
    // })
    const updateCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updateCart } }
      );
  }

  static findById(userId) {
    const db = getDb();

    return db.collection("users").findOne({ _id: new ObjectId(userId) });
  }
}
module.exports = User;
