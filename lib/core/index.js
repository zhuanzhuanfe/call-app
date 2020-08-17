"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.object.assign");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _base = _interopRequireDefault(require("./base"));

var _platform = require("../libs/platform");

var base = new _base["default"]();

var Core = /*#__PURE__*/function () {
  function Core() {
    (0, _classCallCheck2["default"])(this, Core);
    var plat = new _platform.Platform({});
    this.plat = plat.getCurrentPlatform();
    this.caller = null;
    this.loader();
  } // 直接下载能力


  (0, _createClass2["default"])(Core, [{
    key: "loader",
    value: function loader() {
      var ZZCaller = require('../callers/' + this.plat)["default"];

      this.caller = new ZZCaller();
      this.caller.init();
    }
    /**
     * 端外主动调起app方法
     * 所有参数都非必填，默认调起首页（转转）
     * @param channelId：渠道号
     * @param path:吊起的路径(使用统跳协议)
     * @param middleWareUrl：中转url，如空则直接跳转下载安装包或 App Store
     * @param callback：发起调起请求时的回调
     * @param success：调起成功的回调
     * @param fail：调起失败的回调
     */

  }, {
    key: "start",
    value: function start(opts) {
      this.caller.wrap(this.caller.launch.bind(this.caller), Object.assign({}, {
        targetApp: 'zz',
        // 目标App（zz: 主App, seller: 商家App）
        channelId: 923,
        //渠道号
        delay: 800,
        //触发下载的延时时间，低于1600可能会出现调起的同时触发下载
        middleWareUrl: '',
        //下载中转页,如不设置，将直接下载安装包或跳appstore
        wechatCheckInstallState: function wechatCheckInstallState() {},
        //微信端初始化检测安装后的回调函数
        universal: false,
        download: true,
        // 默认吊起失败后，转入下载逻辑
        wechatStyle: 1 // 默认微信吊起失败后，提示右上角打开

      }, opts));
    }
  }], [{
    key: "download",
    value: function download(_ref) {
      var _ref$channelId = _ref.channelId,
          channelId = _ref$channelId === void 0 ? 923 : _ref$channelId,
          middleWareUrl = _ref.middleWareUrl,
          path = _ref.path;

      base.__download({
        channelId: channelId,
        middleWareUrl: middleWareUrl,
        path: path
      });
    }
  }]);
  return Core;
}();

window.CallApp = Core;
var _default = Core;
exports["default"] = _default;