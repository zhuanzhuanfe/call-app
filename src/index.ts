/**
 *
 * CallApp 类
 *
 */

import { generateDownloadUrl } from "./core/download";
import { launch } from "./core/launch";
import { sdkLaunch } from './core/sdkLaunch'
import { is58App, isWechat, isZZ, isZZHunter, isZZSeeker, isZZSeller } from "./libs/platform";
import { getTargetInfo } from "./core/targetApp";
import { evokeByLocation } from "./libs/evoke";
import { generateScheme } from './core/generate'
import { TargetAppNames, CallAppOptions, TargetInfo } from './types'

const defaultOptions: CallAppOptions = {
  path: '/', // 唤起的页面 path
  targetApp: TargetAppNames.ZZ, // 唤起的目标app
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
  callDownload: () => {} // 触发下载 hook
}

export default class CallApp {
  options: CallAppOptions
  targetInfo: TargetInfo
  downloadLink: string
  APP: null | Record<string, any>
  urlScheme: string

  // Create an instance of CallApp
  constructor(options: CallAppOptions) {
    // 原生app js-sdk 实例, 用于调用原生 app能力 (目前支持58app/wx平台)
    this.init(options)
  }
  init(options: CallAppOptions) {
    this.APP = null;
    this.options = this.options ?
      Object.assign(this.options, options) :
      Object.assign(defaultOptions, options);
    // 待唤起目标 app 信息
    this.targetInfo = getTargetInfo(this.options);
    // 根据平台 初始化 下载链接
    this.downloadLink = generateDownloadUrl(this);
    // 初始化 scheme
    this.urlScheme = generateScheme(this)
  }
  /**
   * 触发唤起
   */
  start(options?: CallAppOptions) {
    //
    this.init(options)

    const { callStart } = this.options

    callStart && callStart()

    if (is58App || isZZ || isZZHunter ||
      isZZSeller || isZZSeeker || isWechat) {
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
    this.init(options)

    const { callDownload } = this.options

    callDownload && callDownload()

    console.log('downloadLink', this.downloadLink)
    if (this.downloadLink) return evokeByLocation(this.downloadLink)

    console.warn('please check options.download is true')
  }
}

