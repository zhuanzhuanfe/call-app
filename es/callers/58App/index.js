import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
/**
 * Created by luyunhai on 2018/11/7.
 */
import BaseCaller from '../../core/base';
import { dependencies } from '../../libs/config';
import { WBAPP } from './sdk';

var WBAppCaller = function (_BaseCaller) {
    _inherits(WBAppCaller, _BaseCaller);

    function WBAppCaller() {
        var _this;

        _classCallCheck(this, WBAppCaller);

        console.log('init 58App');
        return _this = _possibleConstructorReturn(this, (WBAppCaller.__proto__ || _Object$getPrototypeOf(WBAppCaller)).call(this, dependencies.WB_SDK, function () {
            _this.WBAPP = window.WBAPP;
            _this.App = new WBAPP(_this.WBAPP);
            console.log('WBAPP is loaded!');
        }));
    }

    _createClass(WBAppCaller, [{
        key: '__isInstallApp',
        value: function __isInstallApp() {
            console.log('isInstallApp is init !');
            return this.App.isInstallApp({
                'urlschema': this.config.AppInfomation.SCHEMA,
                'package': this.config.AppInfomation.ANDROID_PACKAGE_NAME
            });
        }
    }, {
        key: '__openApp',
        value: function __openApp(opts) {
            var options = _get(WBAppCaller.prototype.__proto__ || _Object$getPrototypeOf(WBAppCaller.prototype), 'adaptOptions', this).call(this, opts);
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
        value: function init() {
            console.log('58App caller is inited!');
        }
    }, {
        key: 'launch',
        value: function launch(opts) {
            var _this2 = this;

            console.log('58app launch: ', opts, this);
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
}(BaseCaller);

export default WBAppCaller;