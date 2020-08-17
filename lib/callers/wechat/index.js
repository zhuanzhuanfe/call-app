"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _base = _interopRequireDefault(require("../../core/base"));

var _config = require("../../libs/config");

var _utils = require("../../libs/utils");

var _sdk = _interopRequireDefault(require("./sdk"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var WeChatCaller = /*#__PURE__*/function (_BaseCaller) {
  (0, _inherits2["default"])(WeChatCaller, _BaseCaller);

  var _super = _createSuper(WeChatCaller);

  function WeChatCaller() {
    var _this;

    (0, _classCallCheck2["default"])(this, WeChatCaller);

    // jsonp拉取微信信息接口回调函数
    window.__json_jsticket = function (resp) {
      _this.WX_JSTICKET = resp.respCode == 0 && resp.respData || {};
    };

    return _this = _super.call(this, [_config.dependencies.WX_JWEIXIN, _config.dependencies.WX_JSTICKET], function () {
      _this.cbs = [];

      _this.__onReady().then(function () {
        _this.Wechat = window.WeixinJSBridge;
        _this.App = new _sdk["default"](_this.Wechat, _this.WX_JSTICKET);

        _this.cbs.forEach(function (obj) {
          obj.cb.apply((0, _assertThisInitialized2["default"])(_this), obj.args);
        });
      });
    });
  }

  (0, _createClass2["default"])(WeChatCaller, [{
    key: "init",
    value: function init() {}
  }, {
    key: "__onReady",
    value: function __onReady() {
      return new Promise(function (resolve) {
        window.WeixinJSBridge && resolve() || document.addEventListener('WeixinJSBridgeReady', function () {
          resolve();
        }, false);
      });
    }
  }, {
    key: "__download",
    value: function __download(_ref) {
      var channelId = _ref.channelId,
          download = _ref.download;
      if (!download) return;
      var downloadURL = (0, _utils.regTest)({
        reg: /58\.com/g,
        str: location.hostname
      }) && this.config.downloadUrl.browser + '?channelId=' + channelId || this.config.device.isAndroid && this.config.downloadUrl.wechat_android || this.config.downloadUrl.ios;
      location.href = downloadURL;
    }
  }, {
    key: "__openApp",
    value: function __openApp(options) {
      var _this2 = this;

      var appID = this.config.wechatInfomation.appID;
      var parameter = options.__SCHEMA_PATH;
      var extInfo = options.__SCHEMA_PATH;

      if (this.config.domain.is58Domain) {
        location.href = options.__SCHEMA_PATH;
        setTimeout(function () {
          _this2.__download(options);
        }, 800);
        return;
      }

      return this.App.launchApplication({
        appID: appID,
        parameter: parameter,
        extInfo: extInfo
      }).then(function () {})["catch"](function () {
        return _this2.__download(options);
      });
    }
  }, {
    key: "__isInstallApp",
    value: function __isInstallApp(options) {
      var packageName = this.config.AppInfomation.ANDROID_PACKAGE_NAME;
      var packageUrl = options.__SCHEMA_PATH;
      return this.App.getInstallState({
        packageName: packageName,
        packageUrl: packageUrl
      });
    }
  }, {
    key: "__tryLaunch",
    value: function __tryLaunch(options) {
      var _this3 = this;

      return this.__openApp(options)["catch"](function () {
        return _this3.__download(options);
      });
    }
  }, {
    key: "__invoke",
    value: function __invoke(_ref2) {
      var cb = _ref2.cb,
          args = _ref2.args;
      this.cbs.push({
        cb: cb,
        args: args
      });
    }
  }, {
    key: "__createShareMask",
    value: function __createShareMask() {
      var mask = document.createElement('div');
      mask.style.cssText = 'position: fixed;z-index: 100000;transition: all 0.5s;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0.6);opacity:0';
      mask.innerHTML = '<img src="https://pic3.zhuanstatic.com/zhuanzh/n_v28e90120d40634639b6f606af7ca40fb3.png" style="position:absolute;top:20px;right:20px;left:auto;bottom:auto;line-height:0;width:168px;height:81px;transform: translate3d(0, 0, 0);">';
      document.body.appendChild(mask);
      setTimeout(function () {
        mask.style.opacity = 1;
      }, 300);
      mask.addEventListener('click', function () {
        document.body.removeChild(mask);
      });
    }
  }, {
    key: "__start",
    value: function __start(options) {
      var _this4 = this;

      // 如果不是转转app，那么直接弹出蒙层，提示用户去浏览器打开
      if (options.targetApp !== 'zz' && options.wechatStyle === 1) {
        this.__createShareMask();

        return false;
      }

      this.config.device.isAndroid && this.__isInstallApp(options).then(function () {
        return _this4.__openApp(options);
      })["catch"](function () {
        return _this4.__download(options);
      }) || this.__tryLaunch(options);
    }
  }, {
    key: "launch",
    value: function launch(opts) {
      var _this5 = this;

      if (window.wx) {
        wx.ready(function () {
          var options = (0, _get2["default"])((0, _getPrototypeOf2["default"])(WeChatCaller.prototype), "adaptOptions", _this5).call(_this5, opts);
          _this5.Wechat && _this5.__start(options) || _this5.__invoke({
            cb: _this5.__start,
            args: [options]
          });
        });
      }
    }
  }]);
  return WeChatCaller;
}(_base["default"]);

exports["default"] = WeChatCaller;