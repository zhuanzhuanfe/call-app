/**
 * h5 唤起功能处理 （入口）
 * launch 处理中心， 根据不同运行时环境和目标app, 调用对应的 uri 和 evoke 方法
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
  const { options, download, urlScheme: schemeURL, intentLink } = instance
  let {
    intent = false,
    callFailed = () => { },
    callSuccess = () => { },
    callError = () => { },
    delay = 2500,
  } = options

  // 唤端失败时落地处理
  const supportIntent = intent

  // hack 检测唤起状态
  const handleCheck = (delay = 2500, shouldDownload = true) =>
    checkOpen(
      () => {
        callFailed()
        shouldDownload && download.call(instance)
      },
      callSuccess,
      callError,
      delay
    )

  if (isIos) {
    logInfo('isIos', isIos)
    const tempIosPlatRegList = getDefaultIosPlatRegList(instance)
    for(let item of tempIosPlatRegList) {
      if(item && item.platReg()) item.handler(instance)
    }
  } else if (isAndroid) {
    //
    logInfo('isAndroid', isAndroid)
    if (isOriginalChrome) {
      if (supportIntent) {
        logInfo('isAndroid - supportIntent', isAndroid && supportIntent)
        handleCheck(delay)
        // app-links 无法处理 失败回调， 原因同 universal-link
        intentLink && evokeByLocation(intentLink)
      } else {
        logInfo('isAndroid - !supportIntent', isAndroid && !supportIntent)
        handleCheck(delay)
        // scheme 在 andriod chrome 25+ 版本上 iframe 无法正常拉起
        schemeURL && evokeByLocation(schemeURL)
      }
    } else if (isWechat || isBaidu || isWeibo || isQzone) {
      logInfo(
        'isAndroid -- showMask， isWechat || isBaidu || isWeibo || isQzone',
        isWechat || isBaidu || isWeibo || isQzone
      )
      // 不支持 scheme, 显示遮罩 请在浏览器打开
      showMask()

      callFailed()
    } else {
      // 其他浏览器 通过 scheme 唤起，失败则下载
      logInfo('isAndroid - schemeURL')

      handleCheck(delay)

      schemeURL && evokeByLocation(schemeURL)
    }

    logInfo('schemeURL', schemeURL)
  } else {
    callError()
    logError('your platform is not support, please contact developer')
  }
}

export let tempIosPlatRegList:any = null

// 对外提供  获取方法
export const getIosPlatRegList = (ctx: CallAppInstance) =>
  tempIosPlatRegList || (tempIosPlatRegList = getDefaultIosPlatRegList(ctx))

// 对外提供  扩展方法
export const addIosPlatReg = (ctx: CallAppInstance, item: Record<string, any>) => {
  if(item) {
    const list = getDefaultIosPlatRegList(ctx)
    list.splice(-1, 0, item as any)
    tempIosPlatRegList = [...list]
  }
}
//
export const getDefaultIosPlatRegList = (ctx: CallAppInstance) => {
  const { options, urlScheme: schemeURL, universalLink } = ctx
  let {
    universal = false,
    callFailed = () => { },
    callSuccess = () => { },
    callError = () => { },
    delay = 2500,
  } = options

  const handleCheck = (delay = 2500) => checkOpen(
    () => {
      callFailed()
      ctx.download()
    },
    callSuccess,
    callError,
    delay,
  )
  return [
    {
      name: 'wxSub',
      platReg: () => (isWechat && isLow7WX),
      handler: (instance: CallAppInstance) => {
        console.log(instance)

        logInfo('isIos - isWeibo || isWechat < 7.0.5', isIos && isWechat && isLow7WX)
        showMask()
        callFailed()
      }
    },
    {
      name: 'low9',
      platReg: () => isLow9Ios,
      handler: () => {
        handleCheck(3000)
        schemeURL && evokeByIFrame(schemeURL)
      }
    },
    {
      name: 'bd',
      platReg: () => !universal && isBaidu,
      handler: () => {
        handleCheck(3000)
        showMask()
      }
    },
    {
      name: 'weibo',
      platReg: () => !universal && (isWeibo || isWechat),
      handler: () => {
        showMask()
        callFailed()
      }
    },
    {
      name: 'qq',
      platReg: () => !universal || isQQ || isQQBrowser || isQzone,
      handler: () => {
        handleCheck(3000)
        schemeURL && evokeByTagA(schemeURL)
      }
    },
    {
      name: 'quark',
      platReg: () => isQuark,
      handler: () => {
        handleCheck(3000)
        schemeURL && evokeByTagA(schemeURL)
      }
    },
    {
      name: 'ul',
      platReg: () => isIos,
      handler: () => {
        handleCheck(delay)
        universalLink && evokeByLocation(universalLink)
      }
    },
  ]
}

export const getDefaultAndroidPlatRegList = (ctx: CallAppInstance) => {
  return [
    {

    },
    {

    },
    {

    },
    {

    },
  ]
}
