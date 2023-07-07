

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
      fs.writeFileSync("message.txt", message);
      res.writeHead(302, { Location: "/" });
    //res.statusCode = 302;
    //res.setHeader('Location','/');
      return res.end();
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
Event-driven code execution
 is a programming paradigm where the flow of the program is determined by events that occur asynchronously. Instead of executing code in a linear manner, the program responds to events triggered by user actions, system events, or other sources.

In the given code snippet, an HTTP server is created using the Node.js `http` module. The server listens for incoming requests and responds accordingly. The event-driven nature is evident in how the server handles different events.

When a request is made to the server, the `createServer` function sets up a callback function that is executed whenever a request event occurs. Inside this callback function, the code examines the URL and HTTP method of the request to determine the appropriate response.

If the URL is "/", the server sends an HTML form to the client. This is done by writing HTML content to the response object (`res.write`) and then ending the response (`res.end`). The server handles this request synchronously, meaning it waits for the response to be sent before moving on to the next event.

If the URL is "/message" and the method is "POST", the server processes the data sent by the client. The server listens for the "data" event, which occurs when data is being transmitted in chunks. It collects the chunks of data and stores them in the `body` array. When the "end" event occurs, indicating that all data has been received, the collected chunks are concatenated and converted to a string (`Buffer.concat(body).toString()`). The server then extracts the message from the parsed body and writes it to a file using the `fs` module. Finally, a response with a status code of 302 (redirect) is sent back to the client to redirect them to the home page ("/").

If the URL is neither "/" nor "/message", the server sends a basic HTML response with a greeting message.

In summary, event-driven code execution allows the server to handle multiple events concurrently and respond accordingly based on the nature of each event. It enables non-blocking I/O and asynchronous behavior, making it well-suited for handling multiple simultaneous requests in a single-threaded environment like Node.js.
*/