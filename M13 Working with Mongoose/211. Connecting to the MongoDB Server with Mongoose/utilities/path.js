const path = require('path');

// module.exports = path.dirname(process.mainModule.filename);

// The important thing is that you might get a deprecation warning for that code - in that case, you can simply switch to this code:

module.exports = path.dirname(require.main.filename);