const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Assignment 1</title></head>");
    res.write("<body>");
    res.write("<h1>My First Assignment On Node Server</h1>");
    res.write('<form action="/create-user" method="POST">');
    res.write(
      '<input type="text" name="create-user"><button type="submit">SEND</button></input>'
    );

    res.write("</form>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      //console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parseData = Buffer.concat(body).toString();
      const user = parseData.split("=")[1];
      console.log(user);
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
  if (url === "/users") {
    res.write("<html>");
    res.write("<head><title>Users</title></head>");
    res.write(
      "<body><h3>Users</h3><ul><li>User 1</li><li>User 2</li><li>User 3</li></ul></body>"
    );
    res.write("</html>");
    res.end();
  }
};

module.exports = requestHandler;
