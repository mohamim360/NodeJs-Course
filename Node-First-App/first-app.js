

//we just call this and we store the imported file system functionality in a simple constant

const fs = require('fs');

//And then we can use this file system to call right file sync, which is a method made available by this file system object which we're importing. And this method here will write a file to our harddrive.And the argument it wants is the path to the file, including the file name.

console.log(fs);

fs.writeFileSync('hello.txt','hello from Node.js')