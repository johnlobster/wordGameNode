// node.js does not understand the es6 export/import
// This hack allows imports and exports to work
require = require("esm")(module);
module.exports = require("./wordGameNode.js");
