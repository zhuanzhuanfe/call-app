import "core-js/modules/es.array.concat";
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

import BaseCaller from '../../core/base';
import { dependencies } from '../../libs/config';
import ZZSellerAPP from './sdk'; // 具体平台识别

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
  _inherits(ZZAppCaller, _BaseCaller);

  var _super = _createSuper(ZZAppCaller);

  function ZZAppCaller() {
    var _this;

    _classCallCheck(this, ZZAppCaller);

    return _this = _super.call(this, dependencies.ZZ_LIKE_SDK(plat), function () {
      _this.ZZSellerAPP = {
        zzseller: window.ZZSELLER,
        zzhunter: window.HUNTERAPP,
        yige: window.YIGEAPP
      }[plat];
      _this.App = new ZZSellerAPP(_this.ZZSellerAPP);
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
}(BaseCaller);

export { ZZAppCaller as default };