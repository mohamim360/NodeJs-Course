const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }
  save() {
    const p = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );

    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
      products.push(this);
      fs.watchFile(p, JSON.stringify(products),(err)=>{
		console.log(err);
	  });
    });
  }

  
  static fetchAll() {

	const p = path.join(
		path.dirname(require.main.filename),
		"data",
		"products.json"
	  );

	fs.readFile(p, (err,fileContent) => {
      if(err){
		return [];
	  }
	  return JSON.parse(fileContent);
	})
    return products;
  }
};

/*Asynchronous Nature of fs.readFile: The fs.readFile function is asynchronous, which means it doesn't block the execution of the program. In your current code, you're returning products outside of the callback function passed to fs.readFile, which means it will be executed before the file reading operation is complete. As a result, the function will return products before the data is actually read from the file, and you'll likely get an empty array.

Missing Callback: Since fs.readFile is asynchronous, you need to provide a callback function to handle the result of the file reading operation. Your code currently doesn't have a mechanism to pass the read data back to the caller once the file is read.*/ 