import { isZZ, isZZHunter, isZZSeller, isZZSeeker, is58App, isWechat } from '../libs/platform'

// import { generateIntent, generateScheme, generateUniversalLink } from './generate'
import { zzAppInfo, SDKNames } from '../libs/config'
import { CallAppInstance } from '../index'
import { openZZIn58, openZZInWX, openZZInnerApp } from '../libs/sdk/index'

/**
 * native-sdk 方式 唤起 (目前支持 58app/微信)
 * @param {Object} instance
 */
export const sdkLaunch = async (instance: CallAppInstance) => {
  const { options, targetInfo, urlScheme } = instance
  const { callFailed = () => {} } = options

  try {
    if (is58App) {
      console.log('is58App', is58App)
      openZZIn58(instance, zzAppInfo)
    } else if (isWechat) {
      openZZInWX(instance)
    } else if (isZZ) {
      // 转转app环境内, 可以唤起 找靓机/采货侠/卖家版
      openZZInnerApp(SDKNames.ZZ_SDK, urlScheme, targetInfo)
    } else if (isZZSeeker) {
      // 找靓机app环境内, 可主动唤起 转转/采货侠/卖家版
      openZZInnerApp(SDKNames.ZZ_SDK, urlScheme, targetInfo)
    } else if (isZZHunter) {
      // 命中采货侠  可唤起 转转
      openZZInnerApp(SDKNames.ZZ_HUNTER_SDK, urlScheme, targetInfo)
    } else if (isZZSeller) {
      // 命中卖家版 可唤起 转转
      openZZInnerApp(SDKNames.ZZ_SELLER_SDK, urlScheme, targetInfo)
    } else {
      console.error('')
    }
  } catch (error) {
    callFailed()
  }
}
