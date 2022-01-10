import { getUrlParams, getCookie } from './utils'
/**
 * 授权的公众号id
 * */

const getWxPublicId = (): string | undefined => {
  if (typeof window === 'undefined') {
    return
  }
  const query = getUrlParams()
  const config = window.nativeAdapterConfig || {}
  return query.wxPublicId || config.wxPublicId || query.__t || '24'
}

/**
 * 第三方依赖, 外链js
 * */
export const enum SDKNames {
  Z_SDK = 'Z_SDK',
  W_SDK = 'W_SDK',
  WX_JSTICKET = 'WX_JSTICKET',
  WX_JWEIXIN= 'WX_JWEIXIN',
}

export const dependencies = {
  [SDKNames.Z_SDK]: {
    link: '',
  },
  [SDKNames.W_SDK]: {
    link: '',
  },
  [SDKNames.WX_JSTICKET]: {
    link: '',
  },
  [SDKNames.WX_JWEIXIN]: {
    link: ''
  }
}

/**
 * App, native相关信息
 * */
export interface AppInfo {
  SCHEMA: string
  ANDROID_PACKAGE_NAME: string
  ANDROID_MAINCLS: string
}

export const zAppInfo: AppInfo = {
  SCHEMA: '', // App跳转协议(Android & IOS)
  ANDROID_PACKAGE_NAME: '', // Android客户端包名
  ANDROID_MAINCLS: '', // Android客户端启动页主类名
}

/**
 * 微信公众号相关信息
 * */
export interface WXInfo {
  appID: string
  miniID: string
}

export const wxInfo: WXInfo = {
  appID: '', // app在微信绑定的appid
  miniID: '', // 小程序id
}
