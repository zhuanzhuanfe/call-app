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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QQCaller = function (_BaseCaller) {
    (0, _inherits3.default)(QQCaller, _BaseCaller);

    function QQCaller() {
        (0, _classCallCheck3.default)(this, QQCaller);
        return (0, _possibleConstructorReturn3.default)(this, (QQCaller.__proto__ || (0, _getPrototypeOf2.default)(QQCaller)).call(this));
    }

    (0, _createClass3.default)(QQCaller, [{
        key: 'init',
        value: function init() {}

        /**
         * 创建iframe方法
         * @param scheme
         * @returns {Element}
         */

    }, {
        key: '__createIframe',
        value: function __createIframe(scheme) {
            var ifr = document.createElement('iframe');
            ifr.setAttribute('src', scheme);
            ifr.style.display = 'none';
            document.body.appendChild(ifr);
            return ifr;
        }

        /**
         * 移除iframe方法
         * @param ifr
         */

    }, {
        key: '__removeIframe',
        value: function __removeIframe(ifr) {
            if (ifr) document.body.removeChild(ifr);
        }
    }, {
        key: '__openApp',
        value: function __openApp(options) {
            if (this.config.device.isIOS) {
                var a = document.createElement('a');
                a.setAttribute('href', options.__SCHEMA_PATH);
                return a.click();
            }
            location.href = options.__SCHEMA_PATH;
        }
    }, {
        key: '__tryLaunch',
        value: function __tryLaunch(options) {
            var _this2 = this;

            this.__openApp(options);
            var startTime = Date.now();
            var downloadTimer = setTimeout(function () {
                _this2.__download(options);
            }, options.delay);
            if (this.config.device.isAndroid) {
                setTimeout(function () {
                    var endTime = Date.now();
                    var timeLimit = _this2.config.device.isAndroid ? 800 : 610;
                    if (startTime && endTime - startTime > timeLimit) {
                        clearTimeout(downloadTimer);
                    }
                }, 600);
            }
        }
    }, {
        key: 'launch',
        value: function launch(opts) {
            var options = (0, _get3.default)(QQCaller.prototype.__proto__ || (0, _getPrototypeOf2.default)(QQCaller.prototype), 'adaptOptions', this).call(this, opts);
            this.__tryLaunch(options);
        }
    }]);
    return QQCaller;
}(_base2.default); /**
                    * Created by luyunhai on 2018/11/8.
                    */


exports.default = QQCaller;
module.exports = exports['default'];