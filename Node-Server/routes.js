const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  e;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">SEND</button></input></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const message = parseBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.writeHead(302, { Location: "/" });
        //res.statusCode = 302;
        //res.setHeader('Location','/');
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js server</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = {
  handler: requestHandler,
  text: "djvsd vjsd",
};
//module.exports.handler =  requestHandler;
//exports.handler =  requestHandler;
//module.exports = requestHandler;

/*

and we can now import from that routes.js file by requiring it and node will look for module exports

and see if something was registered for this file here

and we do register something in module exports, the request handler and you can register anything here.

You can add a new javascript object with multiple key value pairs, whatever you need, here

I'll just register my function.
*/
