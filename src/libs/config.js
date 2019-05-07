/**
 * Created by luyunhai on 2018/11/7.
 */
import { regTest } from './utils';

/**
 * 所适配的各种终端 (name 要与 '/src/callers/**' 保持一致)
 * 其余终端统一当做browser处理
 * */
export const platformTypes = [{
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
export const device = {
    isAndroid: regTest({ reg: /android/g, str: navigator.userAgent.toLowerCase() }),
    isIOS: regTest({ reg: /iphone/g, str: navigator.userAgent.toLowerCase() }),
    getType () {
        return this.isAndroid && 'android' || 'ios';
    }
};

/**
 * 页面域名
 * */
export const domain = {
    is58Domain: regTest({ reg: /\.58\.com/g, str: location.origin.toLowerCase() }),
    isZZDomain: regTest({ reg: /\.zhuanzhuan\.com/g, str: location.origin.toLowerCase() })
};

/**
 * 第三方依赖, 外链js
 * */
export const dependencies = {
    ZZ_SELLER_SDK: 'https://s1.zhuanstatic.com/common/zzapp/static/js/zzseller-jssdk.min.js',
    ZZ_SDK: 'https://s1.zhuanstatic.com/common/zzapp/static/js/zzapp.min.js',
    WB_SDK: 'https://a.58cdn.com.cn/app58/rms/app/js/app_30805.js',
    WX_JWEIXIN: 'https://res.wx.qq.com/open/js/jweixin-1.3.2.js',
    WX_WIKI: 'https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115',
    WX_JSTICKET: 'https://app.zhuanzhuan.com/zz/transfer/jsticket?callback=__json_jsticket&url=' + encodeURIComponent(location.href)
};

/**
 * 转转App, native相关信息
 * */
export const AppInfomation = {
    SCHEMA: 'zhuanzhuan://',    // 转转App跳转协议(Android & IOS)
    ANDROID_PACKAGE_NAME: 'com.wuba.zhuanzhuan',    // Android客户端包名
    ANDROID_MAINCLS: 'com.wuba.zhuanzhuan.presentation.view.activity.LaunchActivity',   // Android客户端启动页主类名
};

/**
 * 转转微信公众号相关信息
 * */
export const wechatInfomation = {
    appID: 'wx6f1a8464fa672b11', //转转app在微信绑定的appid
};

/**
 * 各端下载地址
 * */
export const downloadUrl = {
    ios: 'itms-apps://itunes.apple.com/us/app/zhuan-zhuan-kuai-ren-yi-bu/id1002355194?l=zh&ls=1&mt=8',
    // android: 'market://detail?id=com.wuba.zhuanzhuan',
    android: 'market://search?q=pname:com.wuba.zhuanzhuan',
    wechat_android: 'https://sj.qq.com/myapp/detail.htm?apkName=com.wuba.zhuanzhuan',
    browser: 'https://app.zhuanzhuan.com/zz/redirect/download'
};

export const checkDownloadUrl = {
    ios: 'itms-apps://itunes.apple.com/cn/app/id1457304322?mt=8',   
    android: 'market://search?q=pname:com.zhuanzhuan.check',
    browser: 'https://app.zhuanzhuan.com/zzopen/zzgbaselogic/download'
};

/**
 * 跳转协议映射, 老的openType对应统跳的映射表
 * */
export const SchemaMap = {
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

