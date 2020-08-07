import BaseCaller from '../../core/base'
import { IOSVersion, compareVersion } from '../../libs/utils'
import universal from './universal'

const iosVer = IOSVersion()

export default class BrowserCaller extends BaseCaller {
  constructor() {
    super()
  }

  init() {}

  __openApp(options) {
    location.href = options.__SCHEMA_PATH
  }

  __canUniversal() {
    const ua = navigator.userAgent

    if (!/(iphone)|(ipad)|(ipod)/gi.test(ua)) return false
    if (/(baiduboxapp)/gi.test(ua) || /(Safari)/gi.test(ua)) return true
    return false
  }

  __tryLaunch(options) {
    // 支持通用链接跳转
    if (options.universal && this.__canUniversal()) {
      return universal.call(this, options)
    }

    if (compareVersion(iosVer, '12.3.0')) options.delay = 3000

    this.__openApp(options)
    const ua = navigator.userAgent
    let timer = 0
    if (!ua.match(/WeiBo/i)) {
      timer = setTimeout(() => {
        this.__download(options)
      }, options.delay)
    }

    // 页面隐藏，那么代表已经调起了app，就清除下载的定时器
    const visibilitychange = function () {
      const tag = document.hidden || document.webkitHidden
      tag && clearTimeout(timer)
    }
    document.addEventListener('visibilitychange', visibilitychange, false)
    document.addEventListener('webkitvisibilitychange', visibilitychange, false)
    window.addEventListener(
      'pagehide',
      function () {
        clearTimeout(timer)
      },
      false
    )
  }

  launch(opts) {
    const options = super.adaptOptions(opts)
    this.__tryLaunch(options)
  }
}
