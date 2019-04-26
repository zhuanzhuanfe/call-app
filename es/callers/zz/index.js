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
import ZZAPP from './sdk';

var ZZAppCaller = function (_BaseCaller) {
    _inherits(ZZAppCaller, _BaseCaller);

    function ZZAppCaller() {
        var _this;

        _classCallCheck(this, ZZAppCaller);

        return _this = _possibleConstructorReturn(this, (ZZAppCaller.__proto__ || _Object$getPrototypeOf(ZZAppCaller)).call(this, dependencies.ZZ_SDK, function () {
            _this.ZZAPP = window.ZZAPP;
            _this.App = new ZZAPP(_this.ZZAPP);
        }));
    }

    _createClass(ZZAppCaller, [{
        key: '__isInstallApp',
        value: function __isInstallApp() {}
    }, {
        key: '__openApp',
        value: function __openApp(opts) {
            var options = _get(ZZAppCaller.prototype.__proto__ || _Object$getPrototypeOf(ZZAppCaller.prototype), 'adaptOptions', this).call(this, opts);
            var url = encodeURIComponent(options.__SCHEMA_PATH);
            var schema = 'zhuanzhuan://jump/core/openZhuanZhuanSeller/jump';
            var unifiedUrl = schema + '?url=' + url;
            this.App.openApp({ unifiedUrl: unifiedUrl });
        }
    }, {
        key: '__download',
        value: function __download(_ref) {
            var channelId = _ref.channelId;
        }
    }, {
        key: '__tryLaunch',
        value: function __tryLaunch(opts) {
            this.__openApp(opts);
        }
    }, {
        key: 'init',
        value: function init() {}
    }, {
        key: 'launch',
        value: function launch(opts) {
            this.__openApp(opts);
        }
    }]);

    return ZZAppCaller;
}(BaseCaller);

export default ZZAppCaller;