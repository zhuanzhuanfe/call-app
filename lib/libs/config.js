"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchemaMap = exports.checkDownloadUrl = exports.downloadUrl = exports.wechatInfomation = exports.AppInfomation = exports.dependencies = exports.domain = exports.device = exports.platformTypes = void 0;

var _utils = require("./utils");

/**
 * 授权的公众号id
 * */
var getWxPublicId = function getWxPublicId() {
  var query = (0, _utils.getUrlParams)();
  var config = Object.assign({}, window.nativeAdapterConfig);
  return query.wxPublicId || config.wxPublicId || query.__t || (0, _utils.getCookie)('zz_t') || (0, _utils.getCookie)('t') || '24';
};
/**
 * 所适配的各种终端 (name 要与 '/src/callers/**' 保持一致)
 * 其余终端统一当做browser处理
 * */


var platformTypes = [{
  reg: /zhuanzhuanseller/g,
  name: 'zzSeller'
}, {
  reg: /58zhuanzhuan/g,
  name: 'zz'
}, {
  reg: /micromessenger/g,
  name: 'wechat'
}, {
  reg: /wuba/g,
  name: '58App'
}, {
  reg: /qq/g,
  name: 'qq'
}];
/**
 * 设备平台
 * */

exports.platformTypes = platformTypes;
var device = {
  isAndroid: (0, _utils.regTest)({
    reg: /android/g,
    str: navigator.userAgent.toLowerCase()
  }),
  isIOS: (0, _utils.regTest)({
    reg: /iphone/g,
    str: navigator.userAgent.toLowerCase()
  }),
  getType: function getType() {
    return this.isAndroid && 'android' || 'ios';
  }
};
/**
 * 页面域名
 * */

exports.device = device;
var domain = {
  is58Domain: (0, _utils.regTest)({
    reg: /\.58\.com/g,
    str: location.origin.toLowerCase()
  }),
  isZZDomain: (0, _utils.regTest)({
    reg: /\.zhuanzhuan\.com/g,
    str: location.origin.toLowerCase()
  })
};
/**
 * 第三方依赖, 外链js
 * */

exports.domain = domain;
var dependencies = {
  ZZ_SELLER_SDK: 'https://s1.zhuanstatic.com/common/zzapp/static/js/v1.0.14/zzseller-jssdk.min.js',
  ZZ_SDK: 'https://s1.zhuanstatic.com/common/zzapp/static/js/1.14.0/zzapp.min.js',
  WB_SDK: 'https://a.58cdn.com.cn/app58/rms/app/js/app_30805.js?cachevers=670',
  WX_JWEIXIN: 'https://s1.zhuanstatic.com/common/jweixin-1.5.0.js',
  WX_WIKI: 'https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115',
  WX_JSTICKET: "https://app.zhuanzhuan.com/zzopen/wxcommon/getJsTicket?wxPublicId=".concat(getWxPublicId(), "&url=") + encodeURIComponent(window.location.href.split("#")[0]) + '&callback=__json_jsticket'
};
/**
 * 转转App, native相关信息
 * */

exports.dependencies = dependencies;
var AppInfomation = {
  SCHEMA: 'zhuanzhuan://',
  // 转转App跳转协议(Android & IOS)
  ANDROID_PACKAGE_NAME: 'com.wuba.zhuanzhuan',
  // Android客户端包名
  ANDROID_MAINCLS: 'com.wuba.zhuanzhuan.presentation.view.activity.LaunchActivity' // Android客户端启动页主类名

};
/**
 * 转转微信公众号相关信息
 * */

exports.AppInfomation = AppInfomation;
var wechatInfomation = {
  appID: 'wx6f1a8464fa672b11' //转转app在微信绑定的appid

};
/**
 * 各端下载地址
 * */

exports.wechatInfomation = wechatInfomation;
var downloadUrl = {
  ios: 'itms-apps://itunes.apple.com/us/app/zhuan-zhuan-kuai-ren-yi-bu/id1002355194?l=zh&ls=1&mt=8',
  android: 'market://search?q=pname:com.wuba.zhuanzhuan',
  wechat_android: 'https://sj.qq.com/myapp/detail.htm?apkName=com.wuba.zhuanzhuan',
  browser: 'https://app.zhuanzhuan.com/zz/redirect/download'
};
exports.downloadUrl = downloadUrl;

var checkDownloadUrl = function () {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  var iosUrl = 'itms-apps://itunes.apple.com/cn/app/id1457304322?mt=8';
  var androidUrl = 'https://app.zhuanzhuan.com/zzopredirect/zzgbaselogic/download';
  return {
    browser: isAndroid ? androidUrl : iosUrl
  };
}();
/**
 * 跳转协议映射, 老的openType对应统跳的映射表
 * */


exports.checkDownloadUrl = checkDownloadUrl;
var SchemaMap = {
  'home': {
    name: 'home',
    path: 'zhuanzhuan://jump/core/mainPage/jump?tabId=0',
    params: {}
  },
  'messagecenter': {
    name: 'messagecenter',
    path: 'zhuanzhuan://jump/core/mainPage/jump?tabId=2',
    params: {}
  },
  'mybuy': {
    name: 'mybuy',
    path: 'zhuanzhuan://jump/core/myBuyList/jump?tab=price',
    params: {}
  },
  'publish': {
    name: 'publish',
    path: 'zhuanzhuan://jump/core/publish/jump',
    params: {}
  },
  'detail': {
    name: 'detail',
    path: 'zhuanzhuan://jump/core/infoDetail/jump',
    params: {
      id: 'infoId'
    }
  },
  'mysell': {
    name: 'mysell',
    path: 'zhuanzhuan://jump/core/mySellList/jump?tab=price',
    params: {}
  },
  'order': {
    name: 'order',
    path: 'huanzhuan://jump/core/orderDetail/jump',
    params: {
      id: 'orderId'
    }
  },
  'person': {
    name: 'person',
    path: 'zhuanzhuan://jump/core/personHome/jump',
    params: {
      id: 'uid'
    }
  },
  'village': {
    name: 'village',
    path: 'zhuanzhuan://jump/core/village/jump',
    params: {
      id: 'villageId'
    }
  },
  'web': {
    name: 'web',
    path: 'zhuanzhuan://jump/core/web/jump',
    params: {
      id: 'url'
    }
  }
};
exports.SchemaMap = SchemaMap;