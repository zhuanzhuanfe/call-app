/**
 * webview 唤起功能处理 （入口）
 * launch 处理中心， 根据不同运行时环境和目标app 加载对应的 sdk, 调用对应的 uri 和 evoke 方法
 */

import {
  isQQ,
  isWeibo,
  isQzone,
  isAndroid,
  isIos,
  isQQBrowser,
  isBaidu,
  isOriginalChrome,
  isWechat,
  isQuark,
  isLow9Ios,
  isLow7WX,
  isThan12Ios,
} from '../libs/platform'
import { evokeByTagA, evokeByIFrame, evokeByLocation, checkOpen } from '../libs/evoke'
import { CallAppInstance } from '../index'
import { logError, logInfo, showMask } from '../libs/utils'
/**
 * 普通 url-scheme 唤起， 不同平台对应不同的 evoke
 * @param {Object} instance
 */
export const launch = (instance: CallAppInstance) => {
  const { options, download, urlScheme: schemeURL, universalLink, intentLink } = instance
  let {
    universal = false,
    intent = false,
    callFailed = () => {},
    callSuccess = () => {},
    callError = () => {},
    delay = 2500,
  } = options

  // 唤端失败时落地处理
  let checkOpenFall: any
  const supportUniversal = universal
  const supportIntent = intent

  // hack 检测唤起状态
  const handleCheck = (delay = 2500, shouldDownload = true) =>
    checkOpen(
      () => {
        callFailed()
        shouldDownload && download.call(instance)
      },
      () => {
        callSuccess()
      },
      () => {
        callError()
      },
      delay
    )

  if (isIos) {
    logInfo('isIos', isIos)
    // ios-version > v12.3.0
    if (isThan12Ios) delay = options.delay = 3000

    logInfo('isIos > 12.3.0', isThan12Ios)

    if (isWechat && isLow7WX) {
      // 显示遮罩 在浏览器打开
      logInfo('isIos - isWeibo || isWechat < 7.0.5', isIos && isWechat && isLow7WX)

      showMask()
    } else if (isLow9Ios) {
      logInfo('isIos - version < 9', isIos, isLow9Ios, schemeURL)

      schemeURL && evokeByIFrame(schemeURL)
      checkOpenFall = handleCheck(delay)
    } else if (!supportUniversal && isBaidu) {
      logInfo('!supportUniversal && isBaidu', !supportUniversal && isBaidu)

      showMask()
      checkOpenFall = handleCheck(delay)
    } else if (!supportUniversal && (isWeibo || isWechat)) {
      logInfo('!supportUniversal && isWeibo', !supportUniversal && (isWeibo || isWechat))

      showMask()
    } else if (!supportUniversal || isQQ || isQQBrowser || isQzone) {
      logInfo(
        'isIos - !supportUniversal || isQQ || isQQBrowser || isQzone',
        !supportUniversal || isQQ || isQQBrowser || isQzone,
        schemeURL
      )

      schemeURL && evokeByTagA(schemeURL)
      checkOpenFall = handleCheck(delay)
    } else if (isQuark) {
      logInfo('isQuark', isQuark, schemeURL)

      schemeURL && evokeByLocation(schemeURL)
      checkOpenFall = handleCheck(delay)
    } else {
      // universalLink 唤起, 不支持 失败回调处理。
      // 没有app时, 页面重定向到中间页面，原页面生命周期结束 js 不再执行。
      // 更新app 时候，universalLink 可能会失效, u-link 自身的坑。
      logInfo('isIos - support universalLink', universalLink)

      universalLink && evokeByLocation(universalLink)
      checkOpenFall = handleCheck(delay)

      // 有必要的话, 降级采用 schemeURL 处理
      // 测试过程中发现： schemeURL 比 universalLink 稳定，但缺点是需要用户二次确认
      // setTimeout(() => {
      //   evokeByLocation(schemeURL)
      //   checkOpenFall = handleFall
      // });
    }
  } else if (isAndroid) {
    //
    logInfo('isAndroid', isAndroid)
    if (isOriginalChrome) {
      if (supportIntent) {
        logInfo('isAndroid - supportIntent', isAndroid && supportIntent)
        intentLink && evokeByLocation(intentLink)
        // app-links 无法处理 失败回调， 原因同 universal-link
        checkOpenFall = handleCheck(delay)
      } else {
        logInfo('isAndroid - !supportIntent', isAndroid && !supportIntent)
        // scheme 在 andriod chrome 25+ 版本上 iframe 无法正常拉起
        schemeURL && evokeByLocation(schemeURL)
        checkOpenFall = handleCheck(delay)
      }
    } else if (isWechat || isBaidu || isWeibo || isQzone) {
      logInfo(
        'isAndroid -- showMask， isBaidu || isWeibo || isQzone',
        isBaidu || isWeibo || isQzone
      )
      // 不支持 scheme, 显示遮罩 请在浏览器打开
      showMask()
    } else {
      // 其他浏览器 通过 scheme 唤起，失败则下载
      logInfo('isAndroid - schemeURL')

      schemeURL && evokeByLocation(schemeURL)
      checkOpenFall = handleCheck(delay)
    }

    logInfo('schemeURL', schemeURL)
  } else {
    callError()
    logError('your platform is not support, please contact developer')
  }

  logInfo('checkOpenFall', checkOpenFall)

  if (checkOpenFall) {
    return checkOpenFall()
  }

  callFailed()
}
