import _Promise from 'babel-runtime/core-js/promise';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
/**
 * Created by luyunhai on 2018/11/8.
 */
import BaseCaller from '../../core/base';
import { dependencies } from '../../libs/config';
import { regTest } from '../../libs/utils';
import WechatApp from './sdk';

var WeChatCaller = function (_BaseCaller) {
    _inherits(WeChatCaller, _BaseCaller);

    function WeChatCaller() {
        var _this;

        _classCallCheck(this, WeChatCaller);

        // jsonp拉取微信信息接口回调函数
        window.__json_jsticket = function (resp) {
            _this.WX_JSTICKET = resp.respCode == 0 && resp.respData || {};
        };
        return _this = _possibleConstructorReturn(this, (WeChatCaller.__proto__ || _Object$getPrototypeOf(WeChatCaller)).call(this, [dependencies.WX_JWEIXIN,
        // dependencies.WX_WIKI,
        dependencies.WX_JSTICKET], function () {
            _this.cbs = [];
            _this.__onReady().then(function () {
                _this.Wechat = window.WeixinJSBridge;
                _this.App = new WechatApp(_this.Wechat, _this.WX_JSTICKET);
                _this.cbs.forEach(function (obj) {
                    obj.cb.apply(_this, obj.args);
                });
            });
        }));
    }

    _createClass(WeChatCaller, [{
        key: 'init',
        value: function init() {
            console.log('wechat start caller!');
        }
    }, {
        key: '__onReady',
        value: function __onReady() {
            return new _Promise(function (resolve, reject) {
                window.WeixinJSBridge && resolve() || document.addEventListener('WeixinJSBridgeReady', function () {
                    resolve();
                }, false);
            });
        }
    }, {
        key: '__download',
        value: function __download(_ref) {
            var channelId = _ref.channelId;

            var downloadURL = regTest({ reg: /58\.com/g, str: location.hostname }) && this.config.downloadUrl.browser + '?channelId=' + channelId || this.config.device.isAndroid && this.config.downloadUrl.wechat_android || this.config.downloadUrl.ios;
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
                location.href = options.__SCHEMA_PATH;
                setTimeout(function () {
                    _this2.__download(options);
                }, 800);
                return;
            }
            return this.App.launchApplication({ appID: appID, parameter: parameter, extInfo: extInfo }).then(function (data) {}).catch(function (data) {
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
            var options = _get(WeChatCaller.prototype.__proto__ || _Object$getPrototypeOf(WeChatCaller.prototype), 'adaptOptions', this).call(this, opts);
            this.Wechat && this.__start(options) || this.__invoke({
                cb: this.__start,
                args: [options]
            });
        }
    }]);

    return WeChatCaller;
}(BaseCaller);

export default WeChatCaller;