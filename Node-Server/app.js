const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
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
      //write file sync, the sync here stands for synchronous and this is a special method which will actually block code execution until this file is created.
      //fs.writeFileSync("message.txt", message);
      fs.writeFile("message.txt", message, (err) => {
        res.writeHead(302, { Location: "/" });
        //res.statusCode = 302;
        //res.setHeader('Location','/');
        return res.end();
      });
    });
  }
  //The implication for this line is that we reach it too early.

  //So to avoid this, we should actually return "end"
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js server</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);


/*
Blocking and non-blocking code refer to different ways of handling I/O operations in Node.js.

Blocking Code:
In the provided code snippet, fs.writeFileSync is used to write the message to the file "message.txt". This is an example of blocking code. When executing this code, the program halts and waits until the file write operation is completed before proceeding to the next line. During this time, the program is unable to perform any other tasks, such as handling other requests or processing other code. Blocking operations can potentially slow down the entire program if they take a long time to complete.

Non-blocking Code:
On the other hand, the alternative approach fs.writeFile is an example of non-blocking code. In this case, the file write operation is initiated, but the program does not wait for it to finish. Instead, it continues executing the subsequent lines of code. When the write operation is completed, a callback function is invoked to handle any errors and perform further actions. Non-blocking operations allow the program to continue processing other tasks while waiting for the I/O operation to complete, which helps in improving the overall responsiveness and scalability of the application.

In the provided code, replacing fs.writeFileSync with fs.writeFile would make the file write operation non-blocking. Once the operation is finished, the provided callback function is called, which writes the response headers and ends the response. This allows the server to handle other requests or tasks while the file is being written asynchronously.
*/