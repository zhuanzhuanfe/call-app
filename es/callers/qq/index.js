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

var QQCaller = function (_BaseCaller) {
    _inherits(QQCaller, _BaseCaller);

    function QQCaller() {
        _classCallCheck(this, QQCaller);

        var _this = _possibleConstructorReturn(this, (QQCaller.__proto__ || _Object$getPrototypeOf(QQCaller)).call(this));

        console.log('init qq');
        return _this;
    }

    _createClass(QQCaller, [{
        key: 'init',
        value: function init() {
            console.log('qq start caller!');
        }

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
            console.log('qq launch: ', opts, this);
            var options = _get(QQCaller.prototype.__proto__ || _Object$getPrototypeOf(QQCaller.prototype), 'adaptOptions', this).call(this, opts);
            this.__tryLaunch(options);
        }
    }]);

    return QQCaller;
}(BaseCaller);

export default QQCaller;