import "core-js/modules/es.function.bind";
import "core-js/modules/es.object.assign";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import BaseCaller from './base';
import { Platform } from '../libs/platform';
var base = new BaseCaller();

var Core = /*#__PURE__*/function () {
  function Core() {
    _classCallCheck(this, Core);

    var plat = new Platform({});
    this.plat = plat.getCurrentPlatform();
    this.caller = null;
    this.loader();
  } // 直接下载能力


  _createClass(Core, [{
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
export default Core;