import { getUrlParams, getCookie, regTest } from './utils'
/**
 * 授权的公众号id
 * */
declare let window: Window & {
  nativeAdapterConfig: any
}

const getWxPublicId = (): string | undefined => {
  if (typeof window === 'undefined') {
    return
  }
  const query = getUrlParams()
  const config = window.nativeAdapterConfig || {}
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
export enum SDKNames {
  ZZ_SELLER_SDK = 'ZZ_SELLER_SDK',
  ZZ_HUNTER_SDK = 'ZZ_HUNTER_SDK',
  ZZ_SDK = 'ZZ_SDK',
  WB_SDK = 'WB_SDK',
  WX_JWEIXIN = 'WX_JWEIXIN',
  WX_JSTICKET = 'WX_JSTICKET',
  WX_WIKI = 'WX_WIKI',
}

export const dependencies = {
  [SDKNames.ZZ_SELLER_SDK]: {
    link: 'https://s1.zhuanstatic.com/common/zzapp/static/js/v1.0.14/zzseller-jssdk.min.js',
    name: 'ZZSELLER',
  },
  [SDKNames.ZZ_HUNTER_SDK]: {
    link: 'https://s1.zhuanstatic.com/common/hunterapp/static/js/1.1.1/index.min.js',
    name: 'HUNTERAPP',
  },
  [SDKNames.ZZ_SDK]: {
    link: 'https://s1.zhuanstatic.com/common/zzapp/static/js/1.14.0/zzapp.min.js',
    name: '',
  },
  [SDKNames.WB_SDK]: {
    link: 'https://a.58cdn.com.cn/app58/rms/app/js/app_30805.js?cachevers=670',
    name: '',
  },
  [SDKNames.WX_JWEIXIN]: {
    link: 'https://s1.zhuanstatic.com/common/jweixin-1.6.0.js',
    name: '',
  },
  [SDKNames.WX_WIKI]: {
    link: 'https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115',
    name: '',
  },
  [SDKNames.WX_JSTICKET]: {
    link: `https://app.zhuanzhuan.com/zzopen/wxcommon/getJsTicket?wxPublicId=${getWxPublicId()}&url=${encodeURIComponent(
      location ? location.href.split('#')[0] : ''
    )}&callback=__json_jsticket`,
    name: '',
  },
}

/**
 * 转转App, native相关信息
 * */
export const AppInfomation = {
  SCHEMA: 'zhuanzhuan://', // 转转App跳转协议(Android & IOS)
  ANDROID_PACKAGE_NAME: 'com.wuba.zhuanzhuan', // Android客户端包名
  ANDROID_MAINCLS: 'com.wuba.zhuanzhuan.presentation.view.activity.LaunchActivity', // Android客户端启动页主类名
}

export interface AppInfo {
  SCHEMA: string
  ANDROID_PACKAGE_NAME: string
  ANDROID_MAINCLS: string
}

export const zzAppInfo: AppInfo = {
  SCHEMA: 'zhuanzhuan://', // 转转App跳转协议(Android & IOS)
  ANDROID_PACKAGE_NAME: 'com.wuba.zhuanzhuan', // Android客户端包名
  ANDROID_MAINCLS: 'com.wuba.zhuanzhuan.presentation.view.activity.LaunchActivity', // Android客户端启动页主类名
}

/**
 * 转转微信公众号相关信息
 * */
export interface WXInfo {
  appID: string
}
export const wechatInfomation = {
  appID: 'wx6f1a8464fa672b11', // 转转app在微信绑定的appid
}

/**
 * 页面域名
 * */
export const domain = {
  is58Domain: regTest({
    reg: /\.58\.com/g,
    str: window.location && window.location?.origin?.toLowerCase(),
  }),
  isZZDomain: regTest({
    reg: /\.zhuanzhuan\.com/g,
    str: window.location && window.location?.origin?.toLowerCase(),
  }),
}
