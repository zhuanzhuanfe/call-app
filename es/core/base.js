import "core-js/modules/es.array.for-each";
import "core-js/modules/web.dom-collections.for-each";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { loadJSArr } from './widgets/loader';
import PatternsAdapter from './widgets/PatternsAdapter';
import * as config from '../libs/config';
import { Platform } from '../libs/platform';

var BaseCaller = /*#__PURE__*/function () {
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
    key: "__init",
    value: function __init(callback) {
      var _this2 = this;

      this.__mounted = true;
      callback();
      this.callbackList.forEach(function (_ref) {
        var cb = _ref.cb,
            args = _ref.args;
        return cb.call(_this2, args);
      });
    }
  }, {
    key: "__appendCallback",
    value: function __appendCallback(cb, args) {
      this.callbackList.push({
        cb: cb,
        args: args
      });
    }
  }, {
    key: "__download",
    value: function __download(options) {
      var channelId = options.channelId,
          middleWareUrl = options.middleWareUrl,
          download = options.download;
      if (!download) return;
      var plat = new Platform({});
      var platName = plat.getCurrentPlatform();
      var wechat = platName === 'wechat' ? '#mp.weixin.qq.com' : ''; // 不同平台的下载逻辑

      var downloadCofig = this.getDownloadConfig(options);
      location.href = middleWareUrl || downloadCofig.browser + '?channelId=' + channelId + wechat;
    }
  }, {
    key: "getDownloadConfig",
    value: function getDownloadConfig(options) {
      var path = options.path,
          __SCHEMA_PATH = options.__SCHEMA_PATH;
      var p = __SCHEMA_PATH || path;

      if (/^(zzcheck)/.test(p)) {
        return this.config.checkDownloadUrl;
      } else if (/^(zzyige)/.test(p)) {
        return this.config.yigeDownloadUrl;
      } else {
        return this.config.downloadUrl;
      }
    }
  }, {
    key: "wrap",
    value: function wrap(fn, args) {
      if (this.__mounted) {
        return fn && fn(args);
      }

      this.__appendCallback(fn, args);
    }
  }, {
    key: "adaptOptions",
    value: function adaptOptions(options) {
      var patternsAdapter = new PatternsAdapter(options);
      return patternsAdapter.wrap();
    }
  }]);

  return BaseCaller;
}();

export { BaseCaller as default };