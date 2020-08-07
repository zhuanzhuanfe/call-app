import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Created by luyunhai on 2018/12/3.
 */
import BaseCaller from '../../core/base';
import { dependencies } from '../../libs/config';
import ZZAPP from './sdk';

var ZZAppCaller = /*#__PURE__*/function (_BaseCaller) {
  _inherits(ZZAppCaller, _BaseCaller);

  var _super = _createSuper(ZZAppCaller);

  function ZZAppCaller() {
    var _this;

    _classCallCheck(this, ZZAppCaller);

    return _this = _super.call(this, dependencies.ZZ_SDK, function () {
      _this.ZZAPP = window.ZZAPP;
      _this.App = new ZZAPP(_this.ZZAPP);
    });
  }

  _createClass(ZZAppCaller, [{
    key: "__isInstallApp",
    value: function __isInstallApp() {}
  }, {
    key: "__openApp",
    value: function __openApp(opts) {
      var options = _get(_getPrototypeOf(ZZAppCaller.prototype), "adaptOptions", this).call(this, opts);

      var url = encodeURIComponent(options.__SCHEMA_PATH);
      var schema = 'zhuanzhuan://jump/core/openZhuanZhuanSeller/jump';
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
}(BaseCaller);

export { ZZAppCaller as default };