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

var _config = require('../../libs/config');

var _sdk = require('./sdk');

var _sdk2 = _interopRequireDefault(_sdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ZZAppCaller = function (_BaseCaller) {
    (0, _inherits3.default)(ZZAppCaller, _BaseCaller);

    function ZZAppCaller() {
        var _this;

        (0, _classCallCheck3.default)(this, ZZAppCaller);
        return _this = (0, _possibleConstructorReturn3.default)(this, (ZZAppCaller.__proto__ || (0, _getPrototypeOf2.default)(ZZAppCaller)).call(this, _config.dependencies.ZZ_SDK, function () {
            _this.ZZAPP = window.ZZAPP;
            _this.App = new _sdk2.default(_this.ZZAPP);
        }));
    }

    (0, _createClass3.default)(ZZAppCaller, [{
        key: '__isInstallApp',
        value: function __isInstallApp() {
            console.log('isInstallApp is init !');
        }
    }, {
        key: '__openApp',
        value: function __openApp(opts) {
            var options = (0, _get3.default)(ZZAppCaller.prototype.__proto__ || (0, _getPrototypeOf2.default)(ZZAppCaller.prototype), 'adaptOptions', this).call(this, opts);
            var url = encodeURIComponent(options.__SCHEMA_PATH);
            var schema = 'zhuanzhuan://jump/core/openZhuanZhuanSeller/jump';
            var unifiedUrl = schema + '?url=' + url;
            this.App.openApp({ unifiedUrl: unifiedUrl });
        }
    }, {
        key: '__download',
        value: function __download(_ref) {
            var channelId = _ref.channelId;

            console.log('__download', { channelId: channelId });
        }
    }, {
        key: '__tryLaunch',
        value: function __tryLaunch(opts) {
            this.__openApp(opts);
        }
    }, {
        key: 'init',
        value: function init() {
            console.log('zzApp caller is inited!');
        }
    }, {
        key: 'launch',
        value: function launch(opts) {
            this.__openApp(opts);
        }
    }]);
    return ZZAppCaller;
}(_base2.default); /**
                    * Created by luyunhai on 2018/12/3.
                    */


exports.default = ZZAppCaller;
module.exports = exports['default'];