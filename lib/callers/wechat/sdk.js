"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _utils = require("../../libs/utils");

/**
 * Created by luyunhai on 2018/11/9.
 */
var WechatApp = /*#__PURE__*/function () {
  function WechatApp(app, jsTicket) {
    (0, _classCallCheck2["default"])(this, WechatApp);
    this.App = app;
    this.jsTicket = jsTicket;

    this.__init();
  }

  (0, _createClass2["default"])(WechatApp, [{
    key: "__init",
    value: function __init() {
      var conf = this.jsTicket || {};
      var wxconfig = {
        debug: false,
        appId: conf.appId,
        timestamp: conf.timestamp,
        nonceStr: conf.noncestr,
        signature: conf.signature,
        beta: true,
        jsApiList: ['launchApplication', 'getInstallState'],
        openTagList: ['wx-open-launch-app']
      };
      window.wx && window.wx.config(wxconfig) || (window.wxconfig = wxconfig);
    }
  }, {
    key: "__invoke",
    value: function __invoke(name, options) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.App.invoke(name, options, function (data) {
          var err_msg = data.err_msg;
          (0, _utils.regTest)({
            reg: /(:ok)|(:yes)/g,
            str: data && data.err_msg
          }) && resolve({
            code: 0,
            data: {
              err_msg: err_msg
            }
          }) || reject({
            code: -1,
            data: {
              err_msg: err_msg
            }
          });
        });
      });
    }
    /**
     *  @description 微信onReady事件，用来监听 WeixinJSBridge 注入
     *  @return {Promise}
     * */

  }, {
    key: "onReady",
    value: function onReady() {
      var _this2 = this;

      return new Promise(function (resolve) {
        document.addEventListener('WeixinJSBridgeReady', function () {
          _this2.App = window.WeixinJSBridge;
          resolve();
        }, false);
      });
    }
    /**
     *  @description 微信拉起第三方App方法
     *  @param {Object} options -必填项，以json形式传参
     *  @param {String} options.appID - 必填项，通用协议供iOS使用
     *  @param {String} options.parameter - 必填项，appid://parameter 后通过系统接口拉起第三方app。中文或特殊字符需要encode
     *  @param {String} options.extInfo - 必填项，该参数仅Android使用，对应Android微信opensdk中的extInfo，格式自定义，由第三方APP自行解析处理ShowMessageFromWX.Req 的微信回调
     *  @return {Promise}
     * */

  }, {
    key: "launchApplication",
    value: function launchApplication(options) {
      return this.__invoke('launchApplication', options);
    }
    /**
     *  @description 微信判断第三方App是否安卓 (仅仅Android支持, IOS无效、无法判断)
     *  @param {Object} options -必填项，以json形式传参
     *  @param {String} options.packageName - 必填项，安卓的包名
     *  @param {String} options.packageUrl - 必填项，ios 的 schema 协议
     *  @return {Promise}
     * */

  }, {
    key: "getInstallState",
    value: function getInstallState(options) {
      return this.__invoke('getInstallState', options);
    }
  }]);
  return WechatApp;
}();

exports["default"] = WechatApp;