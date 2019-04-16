'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _utils = require('../../libs/utils');

var _sdk = require('./sdk');

var _sdk2 = _interopRequireDefault(_sdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by luyunhai on 2018/11/8.
 */
var WeChatCaller = function (_BaseCaller) {
    (0, _inherits3.default)(WeChatCaller, _BaseCaller);

    function WeChatCaller() {
        var _this;

        (0, _classCallCheck3.default)(this, WeChatCaller);

        console.log('init wechat');
        // jsonp拉取微信信息接口回调函数
        window.__json_jsticket = function (resp) {
            _this.WX_JSTICKET = resp.respCode == 0 && resp.respData || {};
        };
        return _this = (0, _possibleConstructorReturn3.default)(this, (WeChatCaller.__proto__ || (0, _getPrototypeOf2.default)(WeChatCaller)).call(this, [_config.dependencies.WX_JWEIXIN,
        // dependencies.WX_WIKI,
        _config.dependencies.WX_JSTICKET], function () {
            _this.cbs = [];
            _this.__onReady().then(function () {
                _this.Wechat = window.WeixinJSBridge;
                _this.App = new _sdk2.default(_this.Wechat, _this.WX_JSTICKET);
                _this.cbs.forEach(function (obj) {
                    obj.cb.apply(_this, obj.args);
                });
            });
        }));
    }

    (0, _createClass3.default)(WeChatCaller, [{
        key: 'init',
        value: function init() {
            console.log('wechat start caller!');
        }
    }, {
        key: '__onReady',
        value: function __onReady() {
            return new _promise2.default(function (resolve, reject) {
                window.WeixinJSBridge && resolve() || document.addEventListener('WeixinJSBridgeReady', function () {
                    resolve();
                }, false);
            });
        }
    }, {
        key: '__download',
        value: function __download(_ref) {
            var channelId = _ref.channelId;

            var downloadURL = (0, _utils.regTest)({ reg: /58\.com/g, str: location.hostname }) && this.config.downloadUrl.browser + '?channelId=' + channelId || this.config.device.isAndroid && this.config.downloadUrl.wechat_android || this.config.downloadUrl.ios;
            location.href = downloadURL;
        }
    }, {
        key: '__openApp',
        value: function __openApp(options) {
            var _this2 = this;

            var appID = this.config.wechatInfomation.appID;
            var parameter = options.__SCHEMA_PATH;
            var extInfo = options.__SCHEMA_PATH;
            if (this.config.domain.is58Domain) {
                console.log('this.config.domain.is58Domain: ', this.config.domain.is58Domain, options);
                location.href = options.__SCHEMA_PATH;
                setTimeout(function () {
                    _this2.__download(options);
                }, 800);
                return;
            }
            return this.App.launchApplication({ appID: appID, parameter: parameter, extInfo: extInfo }).then(function (data) {
                console.log('launchApplication: ', data);
            }).catch(function (data) {
                return _this2.__download(options);
            });
        }
    }, {
        key: '__isInstallApp',
        value: function __isInstallApp(options) {
            var packageName = this.config.AppInfomation.ANDROID_PACKAGE_NAME;
            var packageUrl = options.__SCHEMA_PATH;
            return this.App.getInstallState({ packageName: packageName, packageUrl: packageUrl });
        }
    }, {
        key: '__tryLaunch',
        value: function __tryLaunch(options) {
            var _this3 = this;

            return this.__openApp(options).catch(function (data) {
                return _this3.__download(options);
            });
        }
    }, {
        key: '__invoke',
        value: function __invoke(_ref2) {
            var cb = _ref2.cb,
                args = _ref2.args;

            this.cbs.push({ cb: cb, args: args });
        }
    }, {
        key: '__start',
        value: function __start(options) {
            var _this4 = this;

            this.config.device.isAndroid && this.__isInstallApp(options).then(function (data) {
                return _this4.__openApp(options);
            }).catch(function (data) {
                return _this4.__download(options);
            }) || this.__tryLaunch(options);
        }
    }, {
        key: 'launch',
        value: function launch(opts) {
            var options = (0, _get3.default)(WeChatCaller.prototype.__proto__ || (0, _getPrototypeOf2.default)(WeChatCaller.prototype), 'adaptOptions', this).call(this, opts);
            this.Wechat && this.__start(options) || this.__invoke({
                cb: this.__start,
                args: [options]
            });
        }
    }]);
    return WeChatCaller;
}(_base2.default);

exports.default = WeChatCaller;
module.exports = exports['default'];