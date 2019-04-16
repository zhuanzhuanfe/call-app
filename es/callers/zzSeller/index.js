import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _get from 'babel-runtime/helpers/get';
import _inherits from 'babel-runtime/helpers/inherits';
/**
 * Created by luyunhai on 2018/12/3.
 */
import BaseCaller from '../../core/base';
import { dependencies } from '../../libs/config';
import ZZSellerAPP from './sdk';

var ZZAppCaller = function (_BaseCaller) {
    _inherits(ZZAppCaller, _BaseCaller);

    function ZZAppCaller() {
        var _this;

        _classCallCheck(this, ZZAppCaller);

        console.log('init zzSellerApp');
        return _this = _possibleConstructorReturn(this, (ZZAppCaller.__proto__ || _Object$getPrototypeOf(ZZAppCaller)).call(this, dependencies.ZZ_SELLER_SDK, function () {
            _this.ZZSellerAPP = window.ZZSELLER;
            _this.App = new ZZSellerAPP(_this.ZZSellerAPP);
            console.log('ZZSellerApp is loaded!');
        }));
    }

    _createClass(ZZAppCaller, [{
        key: '__isInstallApp',
        value: function __isInstallApp() {
            console.log('isInstallApp is init !');
        }
    }, {
        key: '__openApp',
        value: function __openApp(opts) {
            var options = _get(ZZAppCaller.prototype.__proto__ || _Object$getPrototypeOf(ZZAppCaller.prototype), 'adaptOptions', this).call(this, opts);
            console.log('__openApp: ', options);
            var url = encodeURIComponent(options.__SCHEMA_PATH);
            var schema = 'zhuanzhuanseller://jump/core/openZhuanZhuan/jump';
            var unifiedUrl = schema + '?url=' + url;
            console.log('unifiedUrl', unifiedUrl);
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
            console.log('zzSellerApp caller is inited!');
        }
    }, {
        key: 'launch',
        value: function launch(opts) {
            console.log('zzSellerApp launch: ', opts, this);
            this.__openApp(opts);
        }
    }]);

    return ZZAppCaller;
}(BaseCaller);

export default ZZAppCaller;