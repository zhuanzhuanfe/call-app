"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.for-each");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _loader = require("./widgets/loader");

var _PatternsAdapter = _interopRequireDefault(require("./widgets/PatternsAdapter"));

var config = _interopRequireWildcard(require("../libs/config"));

var _platform = require("../libs/platform");

var BaseCaller = /*#__PURE__*/function () {
  function BaseCaller(dependencies) {
    var _this = this;

    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
    (0, _classCallCheck2["default"])(this, BaseCaller);
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

  (0, _createClass2["default"])(BaseCaller, [{
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
      var plat = new _platform.Platform({});
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
      var patternsAdapter = new _PatternsAdapter["default"](options);
      return patternsAdapter.wrap();
    }
  }]);
  return BaseCaller;
}();

exports["default"] = BaseCaller;