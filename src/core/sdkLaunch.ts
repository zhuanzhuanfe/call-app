import { isZZ, isZZHunter, isZZSeller, isZZSeeker, is58App, isWechat } from '../libs/platform'
import { zzAppInfo } from '../libs/config'
import { CallAppInstance } from '../index'
import { openZZIn58, openZZInWX, openZZInnerApp } from '../libs/sdk/index'
import { logError, logInfo } from '../libs/utils'
import { AppFlags } from './targetApp'

/**
 * native-sdk 方式 唤起, 根据不同运行时环境和目标app, 加载对应的 sdk
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
      logInfo('isWXSDK', isWechat)
      openZZInWX(instance)
    } else if (isZZ) {
      logInfo('转转环境')
      // zz-js-sdk
      // 转转app环境内, 可以唤起 找靓机/采货侠/卖家版 / wx小程序
      if (targetInfo.flag & AppFlags.WXMini) {
        openZZInnerApp(instance, AppFlags.ZZ, AppFlags.WXMini)
      }
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
      logInfo('找靓机环境')
      // 找靓机app环境内, 可主动唤起 转转    ？? 采货侠/卖家版
      if (targetInfo.flag & AppFlags.ZZ) {
        openZZInnerApp(instance, AppFlags.ZZ, AppFlags.ZZHunter)
      }
    } else if (isZZHunter) {
      logInfo('采货侠环境')
      // 命中采货侠  可唤起 转转
      if (targetInfo.flag & AppFlags.ZZ) {
        openZZInnerApp(instance, AppFlags.ZZ, AppFlags.ZZHunter)
      }
    } else if (isZZSeller) {
      logInfo('卖家版环境')
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
