"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * Created by luyunhai on 2018/12/3.
 * zzsdk方法集合, 版本:
 * 外链文件地址: https://s1.zhuanstatic.com/common/zzapp/static/js/zzapp.min.js
 */
var ZZAPP = /*#__PURE__*/function () {
  function ZZAPP(app) {
    (0, _classCallCheck2["default"])(this, ZZAPP);
    this.App = app;
  }
  /**
   *  @description 打开调起第三方App (目前转转主App内，只允许打开商家App，zzv >= 5.10)
   *  @param {Object} options -必填项，以json形式传参
   *  @param {String} options.unifiedUrl - 必填项，商家版统跳协议
   *  @param {String} options.needClose - 选填项，是否关闭当前页 ( 1: 关闭当前页面 , 0 不关闭)
   *  @return {Promise}
   * */


  (0, _createClass2["default"])(ZZAPP, [{
    key: "openApp",
    value: function openApp(options) {
      return this.App.enterUnifiedUrl(options);
    }
    /**
     *  @description 获取58app当前版本
     *  @return {String}
     * */

  }, {
    key: "getVersion",
    value: function getVersion() {
      return this.App.version;
    }
  }]);
  return ZZAPP;
}();

exports["default"] = ZZAPP;