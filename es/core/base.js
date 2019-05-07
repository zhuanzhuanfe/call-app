import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
/**
 * Created by luyunhai on 2018/11/8.
 */
import { loadJSArr } from './widgets/loader';
import { Event } from './widgets/Event';
import PatternsAdapter from './widgets/PatternsAdapter';
import * as config from '../libs/config';
import { Platform } from '../libs/platform';

var BaseCaller = function () {
    function BaseCaller(dependencies) {
        var _this = this;

        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        _classCallCheck(this, BaseCaller);

        this.__mounted = false;
        this.callbackList = [];
        this.config = config;
        if (!dependencies) {
            return this.__init(callback);
        }
        loadJSArr(dependencies, function () {
            return _this.__init(callback);
        });
    }

    _createClass(BaseCaller, [{
        key: '__init',
        value: function __init(callback) {
            var _this2 = this;

            this.__mounted = true;
            callback();
            this.callbackList.forEach(function (_ref) {
                var cb = _ref.cb,
                    args = _ref.args;
                return cb.call(_this2, args);
            });
            Event.emit('mounted');
        }
    }, {
        key: '__appendCallback',
        value: function __appendCallback(cb, args) {
            this.callbackList.push({ cb: cb, args: args });
        }
    }, {
        key: '__download',
        value: function __download(options) {
            var channelId = options.channelId,
                middleWareUrl = options.middleWareUrl,
                path = options.path;

            var wechat = '';
            var plat = new Platform({});
            var platName = plat.getCurrentPlatform();
            if (platName === 'wechat') {
                wechat = '#mp.weixin.qq.com';
            }
            var isCheck = /^(zzcheck)/.test(path);
            var downloadCofig = isCheck ? this.config.checkDownloadUrl : this.config.downloadUrl;
            location.href = middleWareUrl || downloadCofig.browser + '?channelId=' + channelId + wechat;
        }
    }, {
        key: 'wrap',
        value: function wrap(fn, args) {
            if (this.__mounted) {
                return fn && fn(args);
            }
            this.__appendCallback(fn, args);
        }
    }, {
        key: 'adaptOptions',
        value: function adaptOptions(options) {
            var patternsAdapter = new PatternsAdapter(options);
            return patternsAdapter.wrap();
        }
    }]);

    return BaseCaller;
}();

export default BaseCaller;