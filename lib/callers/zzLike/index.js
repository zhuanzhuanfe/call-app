"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _base = _interopRequireDefault(require("../../core/base"));

var _config = require("../../libs/config");

var _sdk = _interopRequireDefault(require("./sdk"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

// 具体平台识别
var plat = '';
var schemaPerfix = 'zhuanzhuan://';
var ua = navigator.userAgent.toLowerCase();

if (/zhuanzhuanseller/g.test(ua)) {
  plat = 'zzseller';
  schemaPerfix = 'zhuanzhuanseller://';
} else if (/zzhunter/g.test(ua)) {
  plat = 'zzhunter';
  schemaPerfix = 'zzhunter://';
} else if (/yigeapp/g.test(ua)) {
  plat = 'yige';
  schemaPerfix = 'zzyige://';
}

var ZZAppCaller = /*#__PURE__*/function (_BaseCaller) {
  (0, _inherits2["default"])(ZZAppCaller, _BaseCaller);

  var _super = _createSuper(ZZAppCaller);

  function ZZAppCaller() {
    var _this;

    (0, _classCallCheck2["default"])(this, ZZAppCaller);
    return _this = _super.call(this, _config.dependencies.ZZ_LIKE_SDK(plat), function () {
      _this.ZZSellerAPP = {
        zzseller: window.ZZSELLER,
        zzhunter: window.HUNTERAPP,
        yige: window.YIGEAPP
      }[plat];
      _this.App = new _sdk["default"](_this.ZZSellerAPP);
    });
  }

  (0, _createClass2["default"])(ZZAppCaller, [{
    key: "__isInstallApp",
    value: function __isInstallApp() {}
  }, {
    key: "__openApp",
    value: function __openApp(opts) {
      var options = (0, _get2["default"])((0, _getPrototypeOf2["default"])(ZZAppCaller.prototype), "adaptOptions", this).call(this, opts);
      var url = encodeURIComponent(options.__SCHEMA_PATH);
      var schema = "".concat(schemaPerfix, "jump/core/openZhuanZhuan/jump");
      var unifiedUrl = "".concat(schema, "?url=").concat(url);
      this.App.openApp({
        unifiedUrl: unifiedUrl
      });
    }
  }, {
    key: "__download",
    value: function __download() {}
  }, {
    key: "__tryLaunch",
    value: function __tryLaunch(opts) {
      this.__openApp(opts);
    }
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "launch",
    value: function launch(opts) {
      this.__openApp(opts);
    }
  }]);
  return ZZAppCaller;
}(_base["default"]);

exports["default"] = ZZAppCaller;