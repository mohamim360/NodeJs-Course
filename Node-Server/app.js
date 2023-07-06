//I want to do two things, I want to redirect the user back to slash nothing,so not leave him on /message and I want to create a new file and store the message the user entered in it.


const http = require("http");
const fs = require('fs');
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text"><button type="submit">SEND</button></input></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if(url === '/message' && method === 'POST'){
    fs.writeFileSync('message.txt','DUMMY');
    res.writeHead(302, { 'Location': '/' });
    //res.statusCode = 302;
    //res.setHeader('Location','/');
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


