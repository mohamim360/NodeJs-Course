const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js server</h1></body>");
  res.write("</html>");
  res.end();

});

server.listen(3000);


//res.setHeader("Content-Type", "text/html");, it is telling the client that the response body will contain HTML content. This allows the client to interpret and render the received content appropriately. Web browsers, for example, use this information to determine how to display the HTML content to the user.