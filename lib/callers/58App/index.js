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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WBAppCaller = function (_BaseCaller) {
    (0, _inherits3.default)(WBAppCaller, _BaseCaller);

    function WBAppCaller() {
        var _this;

        (0, _classCallCheck3.default)(this, WBAppCaller);
        return _this = (0, _possibleConstructorReturn3.default)(this, (WBAppCaller.__proto__ || (0, _getPrototypeOf2.default)(WBAppCaller)).call(this, _config.dependencies.WB_SDK, function () {
            _this.WBAPP = window.WBAPP;
            _this.App = new _sdk.WBAPP(_this.WBAPP);
        }));
    }

    (0, _createClass3.default)(WBAppCaller, [{
        key: '__isInstallApp',
        value: function __isInstallApp() {
            return this.App.isInstallApp({
                'urlschema': this.config.AppInfomation.SCHEMA,
                'package': this.config.AppInfomation.ANDROID_PACKAGE_NAME
            });
        }
    }, {
        key: '__openApp',
        value: function __openApp(opts) {
            var options = (0, _get3.default)(WBAppCaller.prototype.__proto__ || (0, _getPrototypeOf2.default)(WBAppCaller.prototype), 'adaptOptions', this).call(this, opts);
            var version = this.App.getVersion();
            // 由于plist白名单问题, 这里做兼容, anroid端都可以支持统跳, ios端8.13.0+(包括v8.13.0)才支持统跳, ios端8.13.0以下智能通过sdk拉起
            if (this.config.device.isAndroid || this.App.compareVersion(version, '8.13.0') >= 0) {
                location.href = options.__SCHEMA_PATH;
                return;
            }
            return this.App.openApp({
                'urlschema': options.__SCHEMA_PATH || this.config.AppInfomation.SCHEMA,
                'package': this.config.AppInfomation.ANDROID_PACKAGE_NAME,
                'maincls': this.config.AppInfomation.ANDROID_MAINCLS
            });
        }
    }, {
        key: '__download',
        value: function __download(_ref) {
            var channelId = _ref.channelId;

            // 58App 渠道下载, 无法传递channelId (Android & IOS 下载都跳转应用市场)
            var type = this.config.device.getType();
            location.href = this.config.downloadUrl[type];
        }
    }, {
        key: '__tryLaunch',
        value: function __tryLaunch(opts) {
            this.__openApp(opts);
            setTimeout(this.__download.bind(this), 800);
        }
    }, {
        key: 'init',
        value: function init() {}
    }, {
        key: 'launch',
        value: function launch(opts) {
            var _this2 = this;

            this.__isInstallApp().then(function (_ref2) {
                var data = _ref2.data,
                    code = _ref2.code;

                // status: "0" 是已安装, “1”是未安装
                if (code != 0) return;
                if (data.status == 0) {
                    return _this2.__openApp(opts);
                }
                return _this2.__tryLaunch(opts);
            });
        }
    }]);
    return WBAppCaller;
}(_base2.default); /**
                    * Created by luyunhai on 2018/11/7.
                    */


exports.default = WBAppCaller;
module.exports = exports['default'];