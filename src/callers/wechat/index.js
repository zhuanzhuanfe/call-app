import BaseCaller from '../../core/base'
import { dependencies } from '../../libs/config'
import { regTest } from '../../libs/utils'
import WechatApp from './sdk'

export default class WeChatCaller extends BaseCaller {
  constructor() {
    // jsonp拉取微信信息接口回调函数
    window.__json_jsticket = resp => {
      this.WX_JSTICKET = (resp.respCode == 0 && resp.respData) || {}
    }
    super([dependencies.WX_JWEIXIN, dependencies.WX_JSTICKET], () => {
      this.cbs = []
      this.__onReady().then(() => {
        this.Wechat = window.WeixinJSBridge
        this.App = new WechatApp(this.Wechat, this.WX_JSTICKET)
        this.cbs.forEach(obj => {
          obj.cb.apply(this, obj.args)
        })
      })
    })
  }
  init() {}
  __onReady() {
    return new Promise(resolve => {
      (window.WeixinJSBridge && resolve()) ||
        document.addEventListener(
          'WeixinJSBridgeReady',
          () => {
            resolve()
          },
          false
        )
    })
  }
  __download({ channelId, download }) {
    if (!download) return
    const downloadURL =
      (regTest({ reg: /58\.com/g, str: location.hostname }) &&
        this.config.downloadUrl.browser + '?channelId=' + channelId) ||
      (this.config.device.isAndroid &&
        this.config.downloadUrl.wechat_android) ||
      this.config.downloadUrl.ios
    location.href = downloadURL
  }
  __openApp(options) {
    const appID = this.config.wechatInfomation.appID
    const parameter = options.__SCHEMA_PATH
    const extInfo = options.__SCHEMA_PATH
    if (this.config.domain.is58Domain) {
      location.href = options.__SCHEMA_PATH
      setTimeout(() => {
        this.__download(options)
      }, 800)
      return
    }
    return this.App.launchApplication({ appID, parameter, extInfo })
      .then(() => {})
      .catch(() => this.__download(options))
  }
  __isInstallApp(options) {
    const packageName = this.config.AppInfomation.ANDROID_PACKAGE_NAME
    const packageUrl = options.__SCHEMA_PATH
    return this.App.getInstallState({ packageName, packageUrl })
  }
  __tryLaunch(options) {
    return this.__openApp(options).catch(() => this.__download(options))
  }
  __invoke({ cb, args }) {
    this.cbs.push({ cb, args })
  }

  __createShareMask() {
    const mask = document.createElement('div')
    mask.style.cssText =
      'position: fixed;z-index: 100000;transition: all 0.5s;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0.6);opacity:0'
    mask.innerHTML =
      '<img src="https://pic3.zhuanstatic.com/zhuanzh/n_v28e90120d40634639b6f606af7ca40fb3.png" style="position:absolute;top:20px;right:20px;left:auto;bottom:auto;line-height:0;width:168px;height:81px;transform: translate3d(0, 0, 0);">'
    document.body.appendChild(mask)
    setTimeout(() => {
      mask.style.opacity = 1
    }, 300)

    mask.addEventListener('click', function () {
      document.body.removeChild(mask)
    })
  }

  __start(options) {
    // 如果不是转转app，那么直接弹出蒙层，提示用户去浏览器打开
    if (options.targetApp !== 'zz' && options.wechatStyle === 1) {
      this.__createShareMask()
      return false
    }

    (this.config.device.isAndroid &&
      this.__isInstallApp(options)
        .then(() => this.__openApp(options))
        .catch(() => this.__download(options))) ||
      this.__tryLaunch(options)
  }
  launch(opts) {
    if (window.wx) {
      wx.ready(() => {
        const options = super.adaptOptions(opts)
        ;(this.Wechat && this.__start(options)) ||
          this.__invoke({
            cb: this.__start,
            args: [options],
          })
      })
    }
  }
}
