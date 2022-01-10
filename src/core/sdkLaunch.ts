import { isZZ, isZZHunter, isZZSeller, isZZSeeker, isWechat } from '../libs/platform'
import { CallAppInstance } from '../index'
import { openZZInWX, openZZInnerApp } from '../libs/sdk/index'
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
    if (isWechat) {
      // wx-js-sdk
      logInfo('isWXSDK', isWechat)
      openZZInWX(instance)
    } else if (isZZ) {
      if (targetInfo.flag) {
        openZZInnerApp(instance, AppFlags.ZZ, targetInfo.flag)
      }
    } else if (isZZSeeker) {
      if (targetInfo.flag & AppFlags.ZZ) {
        openZZInnerApp(instance, AppFlags.ZZSeeker, AppFlags.ZZ)
      }
      if (targetInfo.flag & AppFlags.ZZSeeker) {
        openZZInnerApp(instance, AppFlags.ZZSeeker, AppFlags.ZZSeeker)
      }
    } else if (isZZHunter) {
      if (targetInfo.flag & AppFlags.ZZ) {
        openZZInnerApp(instance, AppFlags.ZZHunter, AppFlags.ZZ)
      }
    } else if (isZZSeller) {
      if (targetInfo.flag & AppFlags.ZZ) {
        openZZInnerApp(instance, AppFlags.ZZSeller, AppFlags.ZZ)
      }
    } else {
      callError()
      logError('your platform do not support, please contact developer')
    }
  } catch (error) {
    callFailed()
  }
}
