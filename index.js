/**
 * Created by luyunhai on 2018/11/13.
 */
'use strict';
var packageObj = require('./package.json');

var version = packageObj.version;
if (process.env.NODE_ENV === 'production') {
    module.exports = require(`./dist/static/js/${version}/index.min.js`);
} else {
    module.exports = require(`./dist/static/js/${version}/index.js`);
}
