"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _base = _interopRequireDefault(require("../../core/base"));

var _utils = require("../../libs/utils");

var _universal = _interopRequireDefault(require("./universal"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var iosVer = (0, _utils.IOSVersion)();

var BrowserCaller = /*#__PURE__*/function (_BaseCaller) {
  (0, _inherits2.default)(BrowserCaller, _BaseCaller);

  var _super = _createSuper(BrowserCaller);

  function BrowserCaller() {
    (0, _classCallCheck2.default)(this, BrowserCaller);
    return _super.call(this);
  }

  (0, _createClass2.default)(BrowserCaller, [{
    key: "init",
    value: function init() {}
  }, {
    key: "__openApp",
    value: function __openApp(options) {
      location.href = options.__SCHEMA_PATH;
    }
  }, {
    key: "__canUniversal",
    value: function __canUniversal() {
      var ua = navigator.userAgent;
      if (!/(iphone)|(ipad)|(ipod)/ig.test(ua)) return false;
      if (/(baiduboxapp)/ig.test(ua) || /(Safari)/ig.test(ua)) return true;
      return false;
    }
  }, {
    key: "__tryLaunch",
    value: function __tryLaunch(options) {
      var _this = this;

      console.log(this.__canUniversal(), options.universal);
      if (options.universal && this.__canUniversal()) return _universal.default.call(this, options);
      if ((0, _utils.compareVersion)(iosVer, '12.3.0')) options.delay = 2500;

      this.__openApp(options);

      var ua = navigator.userAgent;
      var timer = 0;

      if (!ua.match(/WeiBo/i)) {
        timer = setTimeout(function () {
          _this.__download(options);
        }, options.delay);
      }

      var visibilitychange = function visibilitychange() {
        var tag = document.hidden || document.webkitHidden;
        tag && clearTimeout(timer);
      };

      document.addEventListener('visibilitychange', visibilitychange, false);
      document.addEventListener('webkitvisibilitychange', visibilitychange, false);
      window.addEventListener('pagehide', function () {
        clearTimeout(timer);
      }, false);
    }
  }, {
    key: "launch",
    value: function launch(opts) {
      var options = (0, _get2.default)((0, _getPrototypeOf2.default)(BrowserCaller.prototype), "adaptOptions", this).call(this, opts);

      this.__tryLaunch(options);
    }
  }]);
  return BrowserCaller;
}(_base.default);

exports.default = BrowserCaller;