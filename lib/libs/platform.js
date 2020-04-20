"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _config = require("./config");

var Platform = /*#__PURE__*/function () {
  function Platform() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Platform);
    this.ua = opts.ua || navigator.userAgent; // this.types = platformTypes;
  }

  (0, _createClass2.default)(Platform, [{
    key: "getCurrentPlatform",
    value: function getCurrentPlatform() {
      var ua = this.ua.toLowerCase();
      var defaultType = {
        name: 'browser'
      };
      var isWechat = /micromessenger/g.test(ua) && 'wechat';
      var plat = Object.assign({}, defaultType, _config.platformTypes.filter(function (plat) {
        return plat.reg.test(ua);
      })[0]);
      return isWechat || plat.name;
    }
  }]);
  return Platform;
}();

exports.Platform = Platform;