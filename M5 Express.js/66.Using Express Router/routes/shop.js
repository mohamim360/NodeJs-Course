const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<h2>express.js</h2>");
});

// router.use("/", (req, res, next) => {
//   res.send("<h2>express.js</h2>");
// });

// get,make sure that it's not just a get method but this exact path and therefore now if I enter some random stuff, I actually get an error because now I got no single middleware that would handle this

module.exports = router;

/**router.get():

router.get() is used to define a route handler specifically for HTTP GET requests to a particular path.
It only matches the exact path and the HTTP method (GET) specified. If the incoming request doesn't match both the method and the path, the handler defined with router.get() will not be executed.
In the code snippet, router.get("/") defines a route handler for the root path ("/"). When a GET request is made to the root path, the handler sends the response with the content <h2>express.js</h2>.
router.use():

router.use() is used to define a middleware function that will be executed for the specified path and any sub-paths that start with that path.
It matches the path prefix, meaning it will execute for any route that starts with the specified path.
In the code snippet, router.use("/") defines a middleware function for the root path ("/") and any sub-paths. So, this middleware will be executed for all incoming requests to any path.
It's essential to note that the order of defining routes and middleware matters. The code should be structured carefully to avoid undesired side effects or conflicts. */
