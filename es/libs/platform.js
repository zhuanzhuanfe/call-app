import "core-js/modules/es.array.filter";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { platformTypes } from './config';
export var Platform = /*#__PURE__*/function () {
  function Platform() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Platform);

    this.ua = opts.ua || navigator.userAgent;
  }

  _createClass(Platform, [{
    key: "getCurrentPlatform",
    value: function getCurrentPlatform() {
      var ua = this.ua.toLowerCase();
      var defaultType = {
        name: 'browser'
      };
      var plat = Object.assign({}, defaultType, platformTypes.filter(function (plat) {
        if (plat.reg.test(ua)) {
          plat.reg.lastIndex = 0;
          return true;
        }

        return false;
      })[0]);
      return plat.name;
    }
  }]);

  return Platform;
}();