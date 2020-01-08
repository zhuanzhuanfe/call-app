'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Platform = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Platform = exports.Platform = function () {
    function Platform() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, Platform);

        this.ua = opts.ua || navigator.userAgent;
        // this.types = platformTypes;
    }

    (0, _createClass3.default)(Platform, [{
        key: 'getCurrentPlatform',
        value: function getCurrentPlatform() {
            var ua = this.ua.toLowerCase();
            var defaultType = { name: 'browser' };
            var isWechat = /micromessenger/g.test(ua) && 'wechat';
            var plat = (0, _extends3.default)({}, defaultType, _config.platformTypes.filter(function (plat) {
                return plat.reg.test(ua);
            })[0]);
            return isWechat || plat.name;
        }
    }]);
    return Platform;
}();