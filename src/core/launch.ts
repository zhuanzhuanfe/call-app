/**
 * h5 唤起功能处理 （入口）
 * launch 处理中心， 根据不同运行时环境和目标app, 调用对应的 uri 和 evoke 方法
 */

import { isAndroid, isIos } from '../libs/platform'
import { CallAppInstance } from '../index'
import { logInfo } from '../libs/utils'
import { getDefaultIosPlatRegList, getDefaultAndroidPlatRegList } from './launchStrategy'

/**
 * 普通 url-scheme 唤起， 不同平台对应不同的 evoke
 * @param {Object} instance
 */
export const launch = (instance: CallAppInstance) => {
  if (isIos) {
    logInfo('isIos', isIos)
    const list = getDefaultIosPlatRegList(instance)
    const len = list.length
    for (let i = 0; i < len; i++) {
      const item = list[i]
      if (item.platReg()) {
        return item.handler(instance)
      }
    }
  } else if (isAndroid) {
    //
    logInfo('isAndroid', isAndroid)
    const list = getDefaultAndroidPlatRegList(instance)
    const len = list.length
    for (let i = 0; i < len; i++) {
      const item = list[i]
      if (item.platReg()) {
        return item.handler()
      }
    }
  }
}
