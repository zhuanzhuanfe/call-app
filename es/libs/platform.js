import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
/**
 * Created by luyunhai on 2018/11/7.
 */
import { platformTypes } from './config';

export var Platform = function () {
    function Platform() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Platform);

        this.ua = opts.ua || navigator.userAgent;
        // this.types = platformTypes;
    }

    _createClass(Platform, [{
        key: 'getCurrentPlatform',
        value: function getCurrentPlatform() {
            var ua = this.ua.toLowerCase();
            var defaultType = { name: 'browser' };
            var plat = _extends({}, defaultType, platformTypes.find(function (plat) {
                return plat.reg.test(ua);
            }));
            console.log(platformTypes.find(function (plat) {
                return plat.reg.test(ua);
            }));
            return plat.name;
        }
    }]);

    return Platform;
}();