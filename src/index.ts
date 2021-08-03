/**
 *
 * CallApp 类
 *
 */

import { generateDownloadUrl } from "./core/download";
import { launch } from "./core/launch";
import { sdkLaunch } from './core/sdkLaunch'
import { is58App, isAndroid, isIos, isQuark, isSougou, isUC, isWechat, isWeibo, isZZ, isZZHunter, isZZSeeker, isZZSeller } from "./libs/platform";
import { getTargetInfo } from "./core/targetApp";
import { evokeByIFrame, evokeByLocation, evokeByTagA } from "./libs/evoke";
import { generateScheme, generateUniversalLink, generateIntent } from './core/generate'
import { TargetAppNames, CallAppOptions, TargetInfo } from './types'
import { copy, showMask } from "./libs/utils";

const defaultOptions: CallAppOptions = {
  path: '', // 唤起的页面 path
  targetApp: undefined, // 唤起的目标app
  universal: true, // 是否开启 universal-link
  intent: false, // 是否开启 app-links
  download: true, // 是否支持下载
  delay: 2500, // 触发下载 延迟检测时间
  channelId: '923', // 下载渠道 id
  wechatCheckInstallState: () => { }, // 微信端初始化检测安装后的回调函数
  wechatStyle: 1, // 蒙层样式， 默认 微信吊起失败后，提示右上角打开
  deeplinkId: '', // deeplink 接口支持的id配置
  middleWareUrl: '', // 下载中间页 url
  urlSearch: undefined,
  callFailed: () => { }, // 失败 hook
  callSuccess: () => { }, // 成功 hook
  callStart: () => { }, // 开始唤起 hook
  callDownload: () => { }, // 触发下载 hook
  callError: () => { }, // 触发异常 hook
}

export default class CallApp {
  options: CallAppOptions
  targetInfo: TargetInfo
  downloadLink: string
  APP: null | Record<string, any>
  urlScheme: string
  universalLink: string
  intentLink: string

  // Create an instance of CallApp
  constructor(options: CallAppOptions) {
    // 原生app js-sdk 实例, 用于调用原生 app能力 (目前支持58app/wx平台)
    this.init(options)
  }
  init(options: CallAppOptions) {
    // 第三方 配置
    const { customConfig } = options

    if(customConfig) {
      this.options = options
      this.downloadLink = generateDownloadUrl(this)
      this.urlScheme = customConfig.schemeUrl
      if(customConfig.universalLink) {
        this.options.universal = true
        this.universalLink = customConfig.universalLink
      }
      return
    }
    //
    this.APP = null;
    this.options = this.options ?
      Object.assign(this.options, options) :
      Object.assign(defaultOptions, options);
    // 待唤起目标 app 信息
    this.targetInfo = getTargetInfo(this.options);
    console.log(this.targetInfo)
    // 根据平台 初始化 下载链接
    this.downloadLink = generateDownloadUrl(this);
    // 初始化 scheme
    this.urlScheme = generateScheme(this)
    //
    this.universalLink = generateUniversalLink(this)
    //
    this.intentLink = generateIntent(this)
  }
  /**
   * 触发唤起
   */
  start(options?: CallAppOptions) {
    //
    options && this.init(options)

    const { callStart, customConfig } = this.options

    callStart && callStart()
    // 第三方 配置
    if(customConfig) return launch(this)

    const { targetInfo: { name: targetApp } } = this

    if (is58App || isZZ || isZZHunter ||
      isZZSeller || isZZSeeker ||
      (isWechat && targetApp == TargetAppNames.ZZ)) {
      // by native-app launch
      this.APP = Object.create(null)
      sdkLaunch(this)
    } else {
      // by url-scheme launch
      launch(this)
    }
  }
  /**
   * 触发下载
   */
  download(options?: CallAppOptions) {
    //
    options && this.init(options)

    const { callDownload, customConfig } = this.options

    callDownload && callDownload()

    console.log('downloadLink', this.downloadLink)

    if(!customConfig) copy(`1.0$$${this.urlScheme}`)

    if (this.downloadLink) {
      // 个别浏览器 evoke方式 需要单独处理, 防止页面跳转到下载链接 展示异常
      if (isAndroid && isUC) {
        return evokeByTagA(this.downloadLink)
      }

      if (isIos && isQuark) {
        return evokeByIFrame(this.downloadLink)
      }

      if (isWeibo || (isIos && isSougou)) {
        return showMask()
      }

      return evokeByLocation(this.downloadLink)
    }

    console.warn('please check options.download is true')
  }
}

