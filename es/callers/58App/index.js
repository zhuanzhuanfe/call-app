import "core-js/modules/es.date.to-string";
import "core-js/modules/es.function.bind";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/web.timers";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Created by luyunhai on 2018/11/7.
 */
import BaseCaller from '../../core/base';
import { dependencies } from '../../libs/config';
import { WBAPP } from './sdk';

var WBAppCaller = /*#__PURE__*/function (_BaseCaller) {
  _inherits(WBAppCaller, _BaseCaller);

  var _super = _createSuper(WBAppCaller);

  function WBAppCaller() {
    var _this;

    _classCallCheck(this, WBAppCaller);

    return _this = _super.call(this, dependencies.WB_SDK, function () {
      _this.WBAPP = window.WBAPP;
      _this.App = new WBAPP(_this.WBAPP);
    });
  }

  _createClass(WBAppCaller, [{
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
      var options = _get(_getPrototypeOf(WBAppCaller.prototype), "adaptOptions", this).call(this, opts);

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
}(BaseCaller);

export { WBAppCaller as default };