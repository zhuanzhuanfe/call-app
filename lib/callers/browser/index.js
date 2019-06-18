'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('../../core/base');

var _base2 = _interopRequireDefault(_base);

var _utils = require('../../libs/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by luyunhai on 2018/11/8.
 */
var BrowserCaller = function (_BaseCaller) {
    (0, _inherits3.default)(BrowserCaller, _BaseCaller);

    function BrowserCaller() {
        (0, _classCallCheck3.default)(this, BrowserCaller);
        return (0, _possibleConstructorReturn3.default)(this, (BrowserCaller.__proto__ || (0, _getPrototypeOf2.default)(BrowserCaller)).call(this));
    }

    (0, _createClass3.default)(BrowserCaller, [{
        key: 'init',
        value: function init() {}
    }, {
        key: '__openApp',
        value: function __openApp(options) {
            location.href = options.__SCHEMA_PATH;
        }
    }, {
        key: '__tryLaunch',
        value: function __tryLaunch(options) {
            var _this2 = this;

            var iosVer = (0, _utils.IOSVersion)();
            if ((0, _utils.compareVersion)(iosVer, '12.3.0')) options.delay = 2500;

            this.__openApp(options);
            var timer = setTimeout(function () {
                _this2.__download(options);
            }, options.delay);

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
        key: 'launch',
        value: function launch(opts) {
            var options = (0, _get3.default)(BrowserCaller.prototype.__proto__ || (0, _getPrototypeOf2.default)(BrowserCaller.prototype), 'adaptOptions', this).call(this, opts);
            this.__tryLaunch(options);
        }
    }]);
    return BrowserCaller;
}(_base2.default);

exports.default = BrowserCaller;
module.exports = exports['default'];