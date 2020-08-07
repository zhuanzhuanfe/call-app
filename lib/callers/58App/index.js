"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.bind");

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

var _config = require("../../libs/config");

var _sdk = require("./sdk");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var WBAppCaller = /*#__PURE__*/function (_BaseCaller) {
  (0, _inherits2["default"])(WBAppCaller, _BaseCaller);

  var _super = _createSuper(WBAppCaller);

  function WBAppCaller() {
    var _this;

    (0, _classCallCheck2["default"])(this, WBAppCaller);
    return _this = _super.call(this, _config.dependencies.WB_SDK, function () {
      _this.WBAPP = window.WBAPP;
      _this.App = new _sdk.WBAPP(_this.WBAPP);
    });
  }

  (0, _createClass2["default"])(WBAppCaller, [{
    key: "__isInstallApp",
    value: function __isInstallApp() {
      return this.App.isInstallApp({
        urlschema: this.config.AppInfomation.SCHEMA,
        "package": this.config.AppInfomation.ANDROID_PACKAGE_NAME
      });
    }
  }, {
    key: "__openApp",
    value: function __openApp(opts) {
      var options = (0, _get2["default"])((0, _getPrototypeOf2["default"])(WBAppCaller.prototype), "adaptOptions", this).call(this, opts);
      var version = this.App.getVersion(); // 由于plist白名单问题, 这里做兼容, anroid端都可以支持统跳, ios端8.13.0+(包括v8.13.0)才支持统跳, ios端8.13.0以下智能通过sdk拉起

      if (this.config.device.isAndroid || this.App.compareVersion(version, '8.13.0') >= 0) {
        location.href = options.__SCHEMA_PATH;
        return;
      }

      return this.App.openApp({
        urlschema: options.__SCHEMA_PATH || this.config.AppInfomation.SCHEMA,
        "package": this.config.AppInfomation.ANDROID_PACKAGE_NAME,
        maincls: this.config.AppInfomation.ANDROID_MAINCLS
      });
    }
  }, {
    key: "__download",
    value: function __download() {
      // 58App 渠道下载, 无法传递channelId (Android & IOS 下载都跳转应用市场)
      var type = this.config.device.getType();
      location.href = this.config.downloadUrl[type];
    }
  }, {
    key: "__tryLaunch",
    value: function __tryLaunch(opts) {
      this.__openApp(opts);

      setTimeout(this.__download.bind(this), 800);
    }
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "launch",
    value: function launch(opts) {
      var _this2 = this;

      this.__isInstallApp().then(function (_ref) {
        var data = _ref.data,
            code = _ref.code;
        // status: "0" 是已安装, “1”是未安装
        if (code != 0) return;

        if (data.status == 0) {
          return _this2.__openApp(opts);
        }

        return _this2.__tryLaunch(opts);
      });
    }
  }]);
  return WBAppCaller;
}(_base["default"]);

exports["default"] = WBAppCaller;