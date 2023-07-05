const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write('<body><form action="/message" method="POST"><input type="text"><button type="submit">SEND</button></input></form></body>');
    res.write("</html>");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js server</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);

//if (url === "/") { ... }: This condition checks if the requested URL is the root ("/") of the server.

//Inside the if block, the server sends an HTML response back to the client. It writes the HTML content using the res.write() method and ends the response with res.end(). In this case, the HTML form is displayed, allowing the user to enter a message and submit it.

//If the requested URL is not the root ("/"), the server sends a default HTML response. It writes a basic HTML page with a heading saying "Hello from my Node.js server".