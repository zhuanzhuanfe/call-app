'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _loader = require('./widgets/loader');

var _Event = require('./widgets/Event');

var _PatternsAdapter = require('./widgets/PatternsAdapter');

var _PatternsAdapter2 = _interopRequireDefault(_PatternsAdapter);

var _config = require('../libs/config');

var config = _interopRequireWildcard(_config);

var _platform = require('../libs/platform');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseCaller = function () {
    function BaseCaller(dependencies) {
        var _this = this;

        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        (0, _classCallCheck3.default)(this, BaseCaller);

        this.__mounted = false;
        this.callbackList = [];
        this.config = config;
        if (!dependencies) {
            return this.__init(callback);
        }
        (0, _loader.loadJSArr)(dependencies, function () {
            return _this.__init(callback);
        });
    }

    (0, _createClass3.default)(BaseCaller, [{
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
            _Event.Event.emit('mounted');
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
            var plat = new _platform.Platform({});
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
            var patternsAdapter = new _PatternsAdapter2.default(options);
            return patternsAdapter.wrap();
        }
    }]);
    return BaseCaller;
}(); /**
      * Created by luyunhai on 2018/11/8.
      */


exports.default = BaseCaller;
module.exports = exports['default'];