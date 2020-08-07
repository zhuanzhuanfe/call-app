import "core-js/modules/es.date.now";
import "core-js/modules/es.date.to-string";
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
 * Created by luyunhai on 2018/11/8.
 */
import BaseCaller from '../../core/base';

var QQCaller = /*#__PURE__*/function (_BaseCaller) {
  _inherits(QQCaller, _BaseCaller);

  var _super = _createSuper(QQCaller);

  function QQCaller() {
    _classCallCheck(this, QQCaller);

    return _super.apply(this, arguments);
  }

  _createClass(QQCaller, [{
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
      var options = _get(_getPrototypeOf(QQCaller.prototype), "adaptOptions", this).call(this, opts);

      this.__tryLaunch(options);
    }
  }]);

  return QQCaller;
}(BaseCaller);

export { QQCaller as default };