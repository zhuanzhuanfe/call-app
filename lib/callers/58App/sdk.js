'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WBAPP = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by luyunhai on 2018/11/9.
 * 58sdk方法集合, 版本: 30805
 * 外链文件地址: http(s)://a.58cdn.com.cn/app58/rms/app/js/app_30805.js
 * 文档地址: http://apptest.58.com/static/test/app/new_hybird_frame/docs/
 * 老载体页测试新sdk方法地址: http://apptest.58.com/static/test/app/new_hybird_frame/demos/pagetrans-newadd.html
 */

var WBAPP = exports.WBAPP = function () {
    function WBAPP(app) {
        (0, _classCallCheck3.default)(this, WBAPP);

        this.App = app;
    }

    /**
     *  @description 判断第三方app是否存在(58侧plist白名单权限已开通)
     *  @param {Object} options -必填项，以json形式传参
     *  @param {String} options.urlschema - 必填项，通用协议供iOS使用
     *  @param {String} options.package - 必填项，安卓包名供Android使用
     *  @return {Promise} status: "0" 是已安装 “1”是未安装
     * */


    (0, _createClass3.default)(WBAPP, [{
        key: 'isInstallApp',
        value: function isInstallApp(options) {
            var _this = this;

            return new _promise2.default(function (resolve, reject) {
                return _this.App.action && _this.App.action.isInstallApp(options, function (status) {
                    return status ? resolve({
                        code: 0,
                        data: { status: status }
                    }) : reject({
                        code: -1,
                        data: { status: status }
                    });
                });
            });
        }

        /**
         *  @description 打开调起第三方App (iOS 系统版本大于或等于9.0，不能自动打开app。iOS系统限制)
         *  @param {Object} options -必填项，以json形式传参
         *  @param {String} options.urlschema - 必填项，通用协议供iOS使用
         *  @param {String} options.package - 必填项，安卓包名供Android使用
         *  @param {String} options.maincls - 必填项，为Android主类名
         *  @return {Promise}
         * */

    }, {
        key: 'openApp',
        value: function openApp(options) {
            console.log('SDK openApp', options);
            return this.App.action && this.App.action.openApp(options);
        }

        /**
         *  @description 获取58app当前版本
         *  @return {String}
         * */

    }, {
        key: 'getVersion',
        value: function getVersion() {
            return this.App.common.appVersion;
        }

        /**
         *  @description 比较app版本大小的方法
         *  @param {String} version1 - 必填项，版本号1
         *  @param {String} version2 - 必填项，版本号2
         *  @return {String} higher > lower: 1; higher == lower: 0; higher < lower: -1;
         * */

    }, {
        key: 'compareVersion',
        value: function compareVersion(version1, version2) {
            return this.App.util.compareVersion(version1, version2);
        }
    }]);
    return WBAPP;
}();