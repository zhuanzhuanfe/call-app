import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
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
            var isWechat = /micromessenger/g.test(ua) && 'wechat';
            var plat = _extends({}, defaultType, platformTypes.filter(function (plat) {
                return plat.reg.test(ua);
            })[0]);
            return isWechat || plat.name;
        }
    }]);

    return Platform;
}();