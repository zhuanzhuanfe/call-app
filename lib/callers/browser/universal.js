"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var targetToPath = {
  zz: 'zhuanzhuan',
  zzseller: 'seller',
  check: 'check',
  yige: 'yige'
};

function _default(opt) {
  var __SCHEMA_PATH = opt.__SCHEMA_PATH;
  location.href = "https://mjump.zhuanzhuan.com/".concat(targetToPath[opt.targetApp], "/index.html?path=").concat(__SCHEMA_PATH);
}