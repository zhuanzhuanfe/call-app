/**
 *
 * web evoke methods && check evoke-status
 */

import { logError, logInfo } from './utils'

type Hidden = 'hidden' | 'msHidden' | 'webkitHidden'
type VisibilityChange = 'visibilitychange' | 'msvisibilitychange' | 'webkitvisibilitychange'

let hidden: Hidden
let visibilityChange: VisibilityChange
let iframe: HTMLIFrameElement

declare const document: Document

function getSupportedProperty() {
  if (typeof document === 'undefined') return

  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden'
    visibilityChange = 'visibilitychange'
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden'
    visibilityChange = 'msvisibilitychange'
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden'
    visibilityChange = 'webkitvisibilitychange'
  }
}

getSupportedProperty()

/**
 * 判断页面是否隐藏（进入后台）
 */
function isPageHidden(): boolean {
  if (typeof hidden === undefined) return false
  return document[hidden] as boolean
}

/**
 * 通过 top.location.href 跳转
 * @param {string}} [uri] - 需要打开的地址
 */
export function evokeByLocation(uri: string) {
  window.top.location.href = uri
}

/**
 * 通过 A 标签唤起
 * @param {string} uri - 需要打开的地址
 */
export function evokeByTagA(uri: string) {
  const tagA = document.createElement('a')

  tagA.setAttribute('href', uri)
  tagA.style.display = 'none'
  document.body?.append(tagA)

  tagA.click()
}

/**
 * 通过 iframe 唤起
 * @param {string} [uri] - 需要打开的地址
 */
export function evokeByIFrame(uri: string) {
  if (!iframe) {
    iframe = document.createElement('iframe')
    iframe.style.cssText = 'display:none;border:0;width:0;height:0;'
    document.body.append(iframe)
  }

  iframe.src = uri
}

/**
 * hack 检测是否唤端成功
 * 原理见： https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API
 * @param failure - 唤端失败回调函数
 * @param success - 唤端成功回调函数
 * @param error - 唤端异常函数
 * @param timeout - hack 失败检测延时 - 一般会触发下载
 */

export function checkOpen(
  failure: () => void,
  success: () => void,
  error: () => void,
  timeout = 2500
) {
  let haveChanged = false
  logInfo('trigger -- checkOpen')

  const pageChange = function (e: any) {
    haveChanged = true

    if (document?.hidden || e?.hidden || document?.visibilityState == 'hidden') {
      logInfo('checkOpen pagehide -- success')
      success()
    } else {
      logError('unknown error when check pagehide')
      error()
    }

    // window.addEventListener('pagehide', pageChange, false);
    document.removeEventListener(visibilityChange, pageChange, false)
    document.removeEventListener('baiduboxappvisibilitychange', pageChange, false)
  }

  const timer = setTimeout(() => {
    clearTimeout(timer)

    if (haveChanged) {
      return
    }

    // window.addEventListener('pagehide', pageChange, false);
    document.removeEventListener(visibilityChange, pageChange, false)
    document.removeEventListener('baiduboxappvisibilitychange', pageChange, false)

    logInfo('checkOpen timeout', timeout)
    logInfo('checkOpen isPageHidden', isPageHidden())
    // 判断页面是否隐藏（进入后台）
    const pageHidden = isPageHidden()
    if (!pageHidden) {
      failure()
      logInfo('checkOpen hasFailed-failure')
    } else {
      logError('pageHidden: unknown error')
      error()
    }

    haveChanged = true
  }, timeout)

  // window.addEventListener('pagehide', pageChange, false);
  document.addEventListener(visibilityChange, pageChange, false)
  document.addEventListener('baiduboxappvisibilitychange', pageChange, false)
}
