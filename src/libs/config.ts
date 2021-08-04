
import { getUrlParams, getCookie, regTest } from './utils'
/**
 * 授权的公众号id
 * */
const getWxPublicId = (): string | undefined => {
  if (typeof window === 'undefined') { return  }
  const query = getUrlParams()
  const config = window?.nativeAdapterConfig || {}
  return (
    query.wxPublicId ||
    config.wxPublicId ||
    query.__t ||
    getCookie('zz_t') ||
    getCookie('t') ||
    '24'
  )
}

/**
 * 第三方依赖, 外链js
 * */
export const dependencies = {
  ZZ_SELLER_SDK: {
    link: 'https://s1.zhuanstatic.com/common/zzapp/static/js/v1.0.14/zzseller-jssdk.min.js',
    name: 'ZZSELLER'
  },
  ZZ_HUNTER_SDK: {
    link: 'https://s1.zhuanstatic.com/common/hunterapp/static/js/1.1.1/index.min.js',
    name: 'HUNTERAPP',
  },
  ZZ_SDK: {
    link: 'https://s1.zhuanstatic.com/common/zzapp/static/js/1.14.0/zzapp.min.js',
    name: '',
  },
  WB_SDK: {
    link: 'https://a.58cdn.com.cn/app58/rms/app/js/app_30805.js?cachevers=670',
    name: '',
  },
  WX_JWEIXIN: {
    link: 'https://s1.zhuanstatic.com/common/jweixin-1.6.0.js',
    name: '',
  },
  WX_WIKI: {
    link: 'https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115',
  },
  WX_JSTICKET: {
    link: `https://app.zhuanzhuan.com/zzopen/wxcommon/getJsTicket?wxPublicId=${getWxPublicId()}&url=` +
      encodeURIComponent(location ? location.href.split('#')[0] : '') +
      '&callback=__json_jsticket',
  },
}

/**
 * 转转App, native相关信息
 * */
export const AppInfomation = {
  SCHEMA: 'zhuanzhuan://', // 转转App跳转协议(Android & IOS)
  ANDROID_PACKAGE_NAME: 'com.wuba.zhuanzhuan', // Android客户端包名
  ANDROID_MAINCLS:
    'com.wuba.zhuanzhuan.presentation.view.activity.LaunchActivity', // Android客户端启动页主类名
}

/**
 * 转转微信公众号相关信息
 * */
export const wechatInfomation = {
  appID: 'wx6f1a8464fa672b11', //转转app在微信绑定的appid
}


/**
 * 页面域名
 * */
export const domain = {
  is58Domain: regTest({
    reg: /\.58\.com/g,
    str: location && location.origin.toLowerCase(),
  }),
  isZZDomain: regTest({
    reg: /\.zhuanzhuan\.com/g,
    str: location && location.origin.toLowerCase(),
  }),
}
