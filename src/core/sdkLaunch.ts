import { isZZ, isZZHunter, isZZSeller, isZZSeeker, is58App, isWechat } from '../libs/platform'
import { zzAppInfo } from '../libs/config'
import { CallAppInstance } from '../index'
import { openZZIn58, openZZInWX, openZZInnerApp } from '../libs/sdk/index'
import { logError, logInfo } from '../libs/utils'
import { AppFlags } from './targetApp'

/**
 * native-sdk 方式 唤起 (目前支持 58app/微信)
 * @param {Object} instance
 */
export const sdkLaunch = async (instance: CallAppInstance) => {
  const { options, targetInfo } = instance
  const { callFailed = () => {}, callError = () => {} } = options
  if (!targetInfo) return logError(`please check options.targetApp is legal, ${targetInfo}`)
  try {
    if (is58App) {
      // 58-js-sdk
      logInfo('is58App', is58App)
      openZZIn58(instance, zzAppInfo)
    } else if (isWechat) {
      // wx-js-sdk
      openZZInWX(instance)
    } else if (isZZ) {
      // 转转app环境内, 可以唤起 找靓机/采货侠/卖家版
      if (targetInfo.flag & AppFlags.ZZ) {
        openZZInnerApp(instance, AppFlags.ZZ, AppFlags.ZZHunter)
      }
      if (targetInfo.flag & AppFlags.ZZSeeker) {
        openZZInnerApp(instance, AppFlags.ZZ, AppFlags.ZZHunter)
      }
      if (targetInfo.flag & AppFlags.ZZSeller) {
        openZZInnerApp(instance, AppFlags.ZZ, AppFlags.ZZHunter)
      }
    } else if (isZZSeeker) {
      // 找靓机app环境内, 可主动唤起 转转    ？? 采货侠/卖家版
      if (targetInfo.flag & AppFlags.ZZ) {
        openZZInnerApp(instance, AppFlags.ZZ, AppFlags.ZZHunter)
      }
    } else if (isZZHunter) {
      // 命中采货侠  可唤起 转转
      if (targetInfo.flag & AppFlags.ZZ) {
        openZZInnerApp(instance, AppFlags.ZZ, AppFlags.ZZHunter)
      }
    } else if (isZZSeller) {
      // 命中卖家版 可唤起 转转
      if (targetInfo.flag & AppFlags.ZZ) {
        openZZInnerApp(instance, AppFlags.ZZ, AppFlags.ZZHunter)
      }
    } else {
      callError()
      logError('your platform do not support, please contact developer')
    }
  } catch (error) {
    callFailed()
  }
}
