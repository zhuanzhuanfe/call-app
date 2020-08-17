/**
 * Created by luyunhai on 2018/11/9.
 */
import { regTest } from '../../libs/utils'

export default class WechatApp {
  constructor(app, jsTicket) {
    this.App = app
    this.jsTicket = jsTicket
    this.__init()
  }

  __init() {
    const conf = this.jsTicket || {}
    const wxconfig = {
      debug: false,
      appId: conf.appId,
      timestamp: conf.timestamp,
      nonceStr: conf.noncestr,
      signature: conf.signature,
      beta: true,
      jsApiList: ['launchApplication', 'getInstallState'],
      openTagList: ['wx-open-launch-app'],
    }
    ;(window.wx && window.wx.config(wxconfig)) || (window.wxconfig = wxconfig)
  }

  __invoke(name, options) {
    return new Promise((resolve, reject) => {
      this.App.invoke(name, options, data => {
        const { err_msg } = data
        ;(regTest({
          reg: /(:ok)|(:yes)/g,
          str: data && data.err_msg,
        }) &&
          resolve({ code: 0, data: { err_msg } })) ||
          reject({ code: -1, data: { err_msg } })
      })
    })
  }

  /**
   *  @description 微信onReady事件，用来监听 WeixinJSBridge 注入
   *  @return {Promise}
   * */
  onReady() {
    return new Promise(resolve => {
      document.addEventListener(
        'WeixinJSBridgeReady',
        () => {
          this.App = window.WeixinJSBridge
          resolve()
        },
        false
      )
    })
  }

  /**
   *  @description 微信拉起第三方App方法
   *  @param {Object} options -必填项，以json形式传参
   *  @param {String} options.appID - 必填项，通用协议供iOS使用
   *  @param {String} options.parameter - 必填项，appid://parameter 后通过系统接口拉起第三方app。中文或特殊字符需要encode
   *  @param {String} options.extInfo - 必填项，该参数仅Android使用，对应Android微信opensdk中的extInfo，格式自定义，由第三方APP自行解析处理ShowMessageFromWX.Req 的微信回调
   *  @return {Promise}
   * */
  launchApplication(options) {
    return this.__invoke('launchApplication', options)
  }

  /**
   *  @description 微信判断第三方App是否安卓 (仅仅Android支持, IOS无效、无法判断)
   *  @param {Object} options -必填项，以json形式传参
   *  @param {String} options.packageName - 必填项，安卓的包名
   *  @param {String} options.packageUrl - 必填项，ios 的 schema 协议
   *  @return {Promise}
   * */
  getInstallState(options) {
    return this.__invoke('getInstallState', options)
  }
}
