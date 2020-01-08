'use strict';
var packageObj = require('./package.json');

var version = packageObj.version;
module.exports = require('./dist/static/js/'+ version +'/index.min.js');
