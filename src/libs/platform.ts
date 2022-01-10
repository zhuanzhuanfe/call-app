import { logInfo } from './utils'

//  获取平台类型
const ua: string = (window.navigator && window.navigator.userAgent) || ''

/**
 *
 * native-webview 相关
 *
 */

export const is58App: boolean = /wuba/i.test(ua)

export const isZZ: boolean = /58zhuanzhuan/i.test(ua)

export const isZZHunter: boolean = /zzHunter/i.test(ua)

export const isZZSeller: boolean = /zhuanzhuanSeller/i.test(ua)

export const isZZSeeker: boolean = /zhaoliangji-v2/i.test(ua) //zhaoliangji-v2

export const isWechat: boolean = /micromessenger\/([\d.]+)/i.test(ua)

export const isWeibo: boolean = /(weibo).*weibo__([\d.]+)/i.test(ua)

export const isQQ: boolean = /qq\/([\d.]+)/i.test(ua)

export const isQzone: boolean = /qzone\/.*_qz_([\d.]+)/i.test(ua)

/**
 *
 * 操作系统 相关
 *
 */
export const isAndroid: boolean = /android/i.test(ua)

export const isIos: boolean = /iphone|ipad|ipod/i.test(ua)

/**
 *
 * browser 相关
 *
 */

export const isBaidu: boolean = /(baiduboxapp)\/([\d.]+)/i.test(ua)

export const isQQBrowser: boolean = /(qqbrowser)\/([\d.]+)/i.test(ua)

export const isUC: boolean = /ucBrowser\//i.test(ua)

export const isQuark: boolean = /quark\//i.test(ua)

export const isSougou: boolean = /sogouMobileBrowser\//i.test(ua)

export const isHuaWei: boolean = /huaweiBrowser\//i.test(ua)

export const isMi: boolean = /XiaoMi\/MiuiBrowser\//i.test(ua)
// 安卓 chrome 浏览器，包含 原生chrome浏览器、三星自带浏览器、360浏览器以及早期国内厂商自带浏览器
export const isOriginalChrome: boolean =
  /chrome\/[\d.]+ mobile safari\/[\d.]+/i.test(ua) && isAndroid && ua.indexOf('Version') < 0

/**
 *
 * 版本号 相关
 *
 */

// 版本号比较
export const semverCompare = (versionA: string, versionB: string): number => {
  // eslint-disable-next-line no-restricted-properties
  const { isNaN } = window
  const splitA = versionA.split('.')
  const splitB = versionB.split('.')

  for (let i = 0; i < 3; i++) {
    const snippetA = Number(splitA[i])
    const snippetB = Number(splitB[i])

    if (snippetA > snippetB) return 1
    if (snippetB > snippetA) return -1

    // e.g. '1.0.0-rc' -- Number('0-rc') = NaN
    if (!isNaN(snippetA) && isNaN(snippetB)) return 1
    if (isNaN(snippetA) && !isNaN(snippetB)) return -1
  }

  return 0
}

//  获取 ios 大版本号
export const getIOSVersion = (): number | null => {
  const version = window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)

  if (version) return Number.parseInt(version[1], 10)

  return null
}

//  获取 微信 版本号
export const getWeChatVersion = (): string | null => {
  const version = window.navigator.appVersion.match(/micromessenger\/(\d+\.\d+\.\d+)/i)

  if (version) return version[1]

  return null
}

const getLow9Ios = (): boolean => {
  const v = getIOSVersion()
  if (v) {
    return v < 9
  }
  return false
}

export const isLow9Ios: boolean = getLow9Ios()

const getLow7WX = (): boolean => {
  const vv = getWeChatVersion()
  if (vv) {
    return semverCompare(vv, '7.0.5') < 0
  }
  return false
}

export const isLow7WX: boolean = getLow7WX()

// IOS 版本号
export const IOSVersion = (): string => {
  const str = window.navigator.userAgent.toLowerCase()
  let ver = '0.0.0'
  try {
    const m = str.match(/cpu iphone os (.*?) like mac os/)
    if (m) ver = m[1].replace(/_/g, '.')
  } catch (error) {
    logInfo('IOSVersion', error)
  }
  return ver
}

const getThanNumIos = (version: string): boolean => semverCompare(IOSVersion(), version) > 0

export const isThan12Ios: boolean = getThanNumIos('12.3.0')
