import "core-js/modules/es.array.for-each";
import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.timers";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import BaseCaller from '../../core/base';
import { dependencies } from '../../libs/config';
import { regTest } from '../../libs/utils';
import WechatApp from './sdk';

var WeChatCaller = /*#__PURE__*/function (_BaseCaller) {
  _inherits(WeChatCaller, _BaseCaller);

  var _super = _createSuper(WeChatCaller);

  function WeChatCaller() {
    var _this;

    _classCallCheck(this, WeChatCaller);

    // jsonp拉取微信信息接口回调函数
    window.__json_jsticket = function (resp) {
      _this.WX_JSTICKET = resp.respCode == 0 && resp.respData || {};
    };

    return _this = _super.call(this, [dependencies.WX_JWEIXIN, dependencies.WX_JSTICKET], function () {
      _this.cbs = [];

      _this.__onReady().then(function () {
        _this.Wechat = window.WeixinJSBridge;
        _this.App = new WechatApp(_this.Wechat, _this.WX_JSTICKET);

        _this.cbs.forEach(function (obj) {
          obj.cb.apply(_assertThisInitialized(_this), obj.args);
        });
      });
    });
  }

  _createClass(WeChatCaller, [{
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
      var downloadURL = regTest({
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
          var options = _get(_getPrototypeOf(WeChatCaller.prototype), "adaptOptions", _this5).call(_this5, opts);

          _this5.Wechat && _this5.__start(options) || _this5.__invoke({
            cb: _this5.__start,
            args: [options]
          });
        });
      }
    }
  }]);

  return WeChatCaller;
}(BaseCaller);

export { WeChatCaller as default };