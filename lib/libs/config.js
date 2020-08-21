"use strict";

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchemaMap = exports.wechatInfomation = exports.AppInfomation = exports.dependencies = exports.domain = exports.device = exports.yigeDownloadUrl = exports.checkDownloadUrl = exports.downloadUrl = exports.targetToSchema = exports.platformTypes = void 0;

var _utils = require("./utils");

var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
/**
 * 所适配的各种终端 (name 要与 '/src/callers/**' 保持一致)
 * 该终端指的是调起时候的执行环境，而不是需要调起的app
 * 其余终端统一当做browser处理
 * */

var platformTypes = [{
  // 卖家版、采货侠、一格app都走zzLike的适配器，它们都是只需要拉起转转
  reg: /(zhuanzhuanseller)|(zzhunter)|(yigeapp)/g,
  name: 'zzLike'
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
}]; // 目标app名称对应的协议名称

exports.platformTypes = platformTypes;
var targetToSchema = {
  zz: 'zhuanzhuan:',
  zzseller: 'zhuanzhuanseller:',
  check: 'zzcheck:',
  yige: 'zzyige:'
}; // 转转各版本下载地址

exports.targetToSchema = targetToSchema;

var downloadUrl = function () {
  var iosUrl = 'itms-apps://itunes.apple.com/us/app/zhuan-zhuan-kuai-ren-yi-bu/id1002355194?l=zh&ls=1&mt=8';
  var androidUrl = 'market://search?q=pname:com.wuba.zhuanzhuan';
  var wechatAndroid = 'https://sj.qq.com/myapp/detail.htm?apkName=com.wuba.zhuanzhuan';
  return {
    ios: iosUrl,
    android: androidUrl,
    wechat_android: wechatAndroid,
    browser: 'https://app.zhuanzhuan.com/zz/redirect/download'
  };
}(); // 切克各版本下载地址


exports.downloadUrl = downloadUrl;

var checkDownloadUrl = function () {
  var iosUrl = 'itms-apps://itunes.apple.com/cn/app/id1457304322?mt=8';
  var androidUrl = 'https://app.zhuanzhuan.com/zzopredirect/zzgbaselogic/download';
  return {
    browser: isAndroid ? androidUrl : iosUrl
  };
}(); // 一格各版本下载地址


exports.checkDownloadUrl = checkDownloadUrl;

var yigeDownloadUrl = function () {
  var iosUrl = 'itms-apps://itunes.apple.com/us/app/zhuan-zhuan-kuai-ren-yi-bu/id1524602621?l=zh&ls=1&mt=8';
  var androidUrl = 'market://search?q=pname:com.zhuanzhuan.yige';
  var wechatAndroid = 'https://sj.qq.com/myapp/detail.htm?apkName=com.zhuanzhuan.yige';
  return {
    ios: iosUrl,
    android: androidUrl,
    wechat_android: wechatAndroid,
    browser: 'https://app.zhuanzhuan.com/zzopredirect/tobtoollogic/download'
  };
}();
/**
 * 设备平台
 * */


exports.yigeDownloadUrl = yigeDownloadUrl;
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
 * 授权的公众号id
 * */

exports.domain = domain;

var getWxPublicId = function getWxPublicId() {
  var query = (0, _utils.getUrlParams)();
  var config = Object.assign({}, window.nativeAdapterConfig);
  return query.wxPublicId || config.wxPublicId || query.__t || (0, _utils.getCookie)('zz_t') || (0, _utils.getCookie)('t') || '24';
};
/**
 * 第三方依赖, 外链js
 * */


var dependencies = {
  ZZ_LIKE_SDK: function ZZ_LIKE_SDK(plat) {
    var urls = {
      zzseller: 'https://s1.zhuanstatic.com/common/zzapp/static/js/v1.0.14/zzseller-jssdk.min.js',
      zzhunter: 'https://s1.zhuanstatic.com/common/hunterapp/static/js/1.1.1/index.min.js',
      yige: 'https://s1.zhuanstatic.com/common/yigeapp/static/js/1.0.0/index.min.js'
    };
    return urls[plat];
  },
  ZZ_SDK: 'https://s1.zhuanstatic.com/common/zzapp/static/js/1.14.0/zzapp.min.js',
  WB_SDK: 'https://a.58cdn.com.cn/app58/rms/app/js/app_30805.js?cachevers=670',
  WX_JWEIXIN: 'https://s1.zhuanstatic.com/common/jweixin-1.6.0.js',
  WX_WIKI: 'https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115',
  WX_JSTICKET: "https://app.zhuanzhuan.com/zzopen/wxcommon/getJsTicket?wxPublicId=".concat(getWxPublicId(), "&url=") + encodeURIComponent(window.location.href.split('#')[0]) + '&callback=__json_jsticket'
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
 * 跳转协议映射, 老的openType对应统跳的映射表
 * */

exports.wechatInfomation = wechatInfomation;
var SchemaMap = {
  home: {
    name: 'home',
    path: 'zhuanzhuan://jump/core/mainPage/jump?tabId=0',
    params: {}
  },
  messagecenter: {
    name: 'messagecenter',
    path: 'zhuanzhuan://jump/core/mainPage/jump?tabId=2',
    params: {}
  },
  mybuy: {
    name: 'mybuy',
    path: 'zhuanzhuan://jump/core/myBuyList/jump?tab=price',
    params: {}
  },
  publish: {
    name: 'publish',
    path: 'zhuanzhuan://jump/core/publish/jump',
    params: {}
  },
  detail: {
    name: 'detail',
    path: 'zhuanzhuan://jump/core/infoDetail/jump',
    params: {
      id: 'infoId'
    }
  },
  mysell: {
    name: 'mysell',
    path: 'zhuanzhuan://jump/core/mySellList/jump?tab=price',
    params: {}
  },
  order: {
    name: 'order',
    path: 'huanzhuan://jump/core/orderDetail/jump',
    params: {
      id: 'orderId'
    }
  },
  person: {
    name: 'person',
    path: 'zhuanzhuan://jump/core/personHome/jump',
    params: {
      id: 'uid'
    }
  },
  village: {
    name: 'village',
    path: 'zhuanzhuan://jump/core/village/jump',
    params: {
      id: 'villageId'
    }
  },
  web: {
    name: 'web',
    path: 'zhuanzhuan://jump/core/web/jump',
    params: {
      id: 'url'
    }
  }
};
exports.SchemaMap = SchemaMap;