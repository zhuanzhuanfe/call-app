'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (opt) {
  var __SCHEMA_PATH = opt.__SCHEMA_PATH;

  var path = /^(zzcheck)/.test(__SCHEMA_PATH) ? 'check' : /^(zhuanzhuanseller)/.test(__SCHEMA_PATH) ? 'seller' : 'zhuanzhuan';

  location.href = 'https://mjump.zhuanzhuan.com/' + path + '/index.html?path=' + __SCHEMA_PATH;
};

module.exports = exports['default'];