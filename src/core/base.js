import { loadJSArr } from './widgets/loader'
import PatternsAdapter from './widgets/PatternsAdapter'
import * as config from '../libs/config'
import { Platform } from '../libs/platform'

export default class BaseCaller {
  constructor(dependencies, callback = () => {}) {
    this.__mounted = false
    this.callbackList = []
    this.config = config
    if (!dependencies) {
      return this.__init(callback)
    }
    loadJSArr(dependencies, () => this.__init(callback))
  }

  __init(callback) {
    this.__mounted = true
    callback()
    this.callbackList.forEach(({ cb, args }) => cb.call(this, args))
  }

  __appendCallback(cb, args) {
    this.callbackList.push({ cb, args })
  }

  __download(options) {
    const { channelId, middleWareUrl, download } = options
    if (!download) return
    const plat = new Platform({})
    const platName = plat.getCurrentPlatform()
    let wechat = platName === 'wechat' ? '#mp.weixin.qq.com' : ''

    // 不同平台的下载逻辑
    const downloadCofig = this.getDownloadConfig(options)

    location.href =
      middleWareUrl ||
      downloadCofig.browser + '?channelId=' + channelId + wechat
  }

  getDownloadConfig(options) {
    const { path, __SCHEMA_PATH } = options
    const p = __SCHEMA_PATH || path
    if (/^(zzcheck)/.test(p)) {
      return this.config.checkDownloadUrl
    } else if (/^(zzyige)/.test(p)) {
      return this.config.yigeDownloadUrl
    } else {
      return this.config.downloadUrl
    }
  }

  wrap(fn, args) {
    if (this.__mounted) {
      return fn && fn(args)
    }
    this.__appendCallback(fn, args)
  }

  adaptOptions(options) {
    const patternsAdapter = new PatternsAdapter(options)
    return patternsAdapter.wrap()
  }
}
