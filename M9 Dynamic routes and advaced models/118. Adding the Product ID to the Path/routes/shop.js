const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/products",shopController.addProducts);

router.get("/products/:productId",shopController.getProduct);

//router.get("/products/delete");  --X not right
/*delete would basically be treated as the dynamic segment.So if you had a dynamic segment and a specific route, you would have to put the more specific route first*/

router.get("/cart",shopController.getCart);

router.get("/orders",shopController.getOrders);

router.get("/checkout",shopController.getCheckout);

module.exports = router;
