import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.match";
import "core-js/modules/web.timers";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import BaseCaller from '../../core/base';
import { IOSVersion, compareVersion } from '../../libs/utils';
import universal from './universal';
var iosVer = IOSVersion();

var BrowserCaller = /*#__PURE__*/function (_BaseCaller) {
  _inherits(BrowserCaller, _BaseCaller);

  var _super = _createSuper(BrowserCaller);

  function BrowserCaller() {
    _classCallCheck(this, BrowserCaller);

    return _super.call(this);
  }

  _createClass(BrowserCaller, [{
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
      if (!/(iphone)|(ipad)|(ipod)/gi.test(ua)) return false;
      if (/(baiduboxapp)/gi.test(ua) || /(Safari)/gi.test(ua)) return true;
      return false;
    }
  }, {
    key: "__tryLaunch",
    value: function __tryLaunch(options) {
      var _this = this;

      // 支持通用链接跳转
      if (options.universal && this.__canUniversal()) {
        return universal.call(this, options);
      }

      if (compareVersion(iosVer, '12.3.0')) options.delay = 3000;

      this.__openApp(options);

      var ua = navigator.userAgent;
      var timer = 0;

      if (!ua.match(/WeiBo/i)) {
        timer = setTimeout(function () {
          _this.__download(options);
        }, options.delay);
      } // 页面隐藏，那么代表已经调起了app，就清除下载的定时器


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
      var options = _get(_getPrototypeOf(BrowserCaller.prototype), "adaptOptions", this).call(this, opts);

      this.__tryLaunch(options);
    }
  }]);

  return BrowserCaller;
}(BaseCaller);

export { BrowserCaller as default };