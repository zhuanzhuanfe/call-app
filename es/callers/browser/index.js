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
import { IOSVersion, compareVersion } from '../../libs/utils';

var BrowserCaller = function (_BaseCaller) {
    _inherits(BrowserCaller, _BaseCaller);

    function BrowserCaller() {
        _classCallCheck(this, BrowserCaller);

        return _possibleConstructorReturn(this, (BrowserCaller.__proto__ || _Object$getPrototypeOf(BrowserCaller)).call(this));
    }

    _createClass(BrowserCaller, [{
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

            var iosVer = IOSVersion();
            if (compareVersion(iosVer, '12.3.0')) options.delay = 2500;

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
            var options = _get(BrowserCaller.prototype.__proto__ || _Object$getPrototypeOf(BrowserCaller.prototype), 'adaptOptions', this).call(this, opts);
            this.__tryLaunch(options);
        }
    }]);

    return BrowserCaller;
}(BaseCaller);

export default BrowserCaller;