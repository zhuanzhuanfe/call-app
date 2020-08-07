"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.date.now");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/web.timers");

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

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var QQCaller = /*#__PURE__*/function (_BaseCaller) {
  (0, _inherits2["default"])(QQCaller, _BaseCaller);

  var _super = _createSuper(QQCaller);

  function QQCaller() {
    (0, _classCallCheck2["default"])(this, QQCaller);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(QQCaller, [{
    key: "init",
    value: function init() {}
  }, {
    key: "__openApp",
    value: function __openApp(options) {
      if (this.config.device.isIOS) {
        var a = document.createElement('a');
        a.setAttribute('href', options.__SCHEMA_PATH);
        return a.click();
      }

      location.href = options.__SCHEMA_PATH;
    }
  }, {
    key: "__tryLaunch",
    value: function __tryLaunch(options) {
      var _this = this;

      this.__openApp(options);

      var startTime = Date.now();
      var downloadTimer = setTimeout(function () {
        _this.__download(options);
      }, options.delay);

      if (this.config.device.isAndroid) {
        setTimeout(function () {
          var endTime = Date.now();
          var timeLimit = _this.config.device.isAndroid ? 800 : 610;

          if (startTime && endTime - startTime > timeLimit) {
            clearTimeout(downloadTimer);
          }
        }, 600);
      }
    }
  }, {
    key: "launch",
    value: function launch(opts) {
      var options = (0, _get2["default"])((0, _getPrototypeOf2["default"])(QQCaller.prototype), "adaptOptions", this).call(this, opts);

      this.__tryLaunch(options);
    }
  }]);
  return QQCaller;
}(_base["default"]);

exports["default"] = QQCaller;