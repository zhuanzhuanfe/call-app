/**
 *
 * CallApp 类
 *
 */

import { generateDownloadUrl, AppNames } from './core/download'
import { launch } from './core/launch'
import { sdkLaunch } from './core/sdkLaunch'
import {
  is58App,
  isAndroid,
  isIos,
  isQuark,
  isSougou,
  isUC,
  isWechat,
  isWeibo,
  isZZ,
  isZZHunter,
  isZZSeeker,
  isZZSeller,
} from './libs/platform'
import { AppFlags, getTargetInfo } from './core/targetApp'
import { evokeByIFrame, evokeByLocation, evokeByTagA } from './libs/evoke'
import {
  generateScheme,
  generateUniversalLink,
  generateIntent,
  Intent,
  UrlSearch,
} from './core/generate'
import { copy, logError, logInfo, showMask } from './libs/utils'

const defaultOptions: CallAppOptions = {
  path: '', // 唤起的页面 path
  targetApp: undefined, // 唤起的目标app
  universal: true, // 是否开启 universal-link
  intent: false, // 是否开启 安卓 app-links / 目前不支持
  download: true, // 是否支持下载
  delay: 2500, // 触发下载 延迟检测时间
  channelId: '923', // 下载渠道 id
  onWechatReady: () => {}, // 微信端初始化检测安装后的回调函数
  wechatStyle: 1, // 蒙层样式， 默认 微信吊起失败后，提示右上角打开
  deeplinkId: '', // deeplink 接口支持的id配置
  middleWareUrl: '', // 下载中间页 url
  urlSearch: undefined,
  callFailed: () => {}, // 失败 hook
  callSuccess: () => {}, // 成功 hook
  callStart: () => {}, // 开始唤起 hook
  callDownload: () => {}, // 触发下载 hook
  callError: () => {}, // 触发异常 hook
}

export default class CallApp {
  options: CallAppOptions = {}

  targetInfo?: TargetInfo

  downloadLink?: string

  urlScheme?: string

  universalLink?: string

  intentLink?: string

  // Create an instance of CallApp
  constructor(options?: CallAppOptions) {
    // 原生app js-sdk 实例, 用于调用原生 app能力 (目前支持58app/wx平台)
    options && this.init(options)
  }

  init(options: CallAppOptions) {
    // 第三方 配置
    const { customConfig } = options

    if (customConfig) {
      this.options = options
      this.downloadLink = generateDownloadUrl(this)
      this.urlScheme = customConfig.schemeUrl
      if (customConfig.universalLink) {
        this.options.universal = true
        this.universalLink = customConfig.universalLink
      }
      return
    }
    //
    this.options = { ...defaultOptions, ...options }
    // 下面配置，提取预处理 减少后续逻辑处理代价
    // 待唤起目标 app 信息
    this.targetInfo = getTargetInfo(this.options)
    logInfo('targetInfo', this.targetInfo)
    // 根据平台 初始化 下载链接
    this.downloadLink = generateDownloadUrl(this)
    logInfo('downloadLink', this.downloadLink)
    // 初始化 deep-link url-scheme
    this.urlScheme = generateScheme(this)
    logInfo('urlScheme', this.urlScheme)
    // 初始化 app-links universalLink
    this.universalLink = generateUniversalLink(this)
    logInfo('universalLink', this.universalLink)
    // 初始化 app-links intentLink // 目前zz不支持 兼容性较差
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
    if (customConfig?.schemeUrl) return launch(this)

    const { targetInfo: { name: targetApp } = {} } = this

    if (
      is58App ||
      isZZ ||
      isZZHunter ||
      isZZSeller ||
      isZZSeeker ||
      (isWechat && targetApp === AppNames[AppFlags.ZZ])
    ) {
      // by native-app launch
      sdkLaunch(this)
    } else {
      // by uri/url launch
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

    logInfo('downloadLink', this.downloadLink)

    if (!customConfig) copy(`1.0$$${this.urlScheme}`)

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

    logError('please check options.download is true')
  }
}

export interface DownloadConfig {
  // 苹果市场
  ios: string
  // 安卓市场
  android: string
  android_api?: string
  // 应用宝
  android_yyb: string
  // api
  api?: string
}

export interface TargetInfo {
  flag: AppFlags
  name: string
  schemePrefix: string
  universalPath: string
  downloadConfig: DownloadConfig
}
export interface CallAppOptions {
  // 唤起的页面 path
  path?: string
  // 唤起的目标app
  targetApp?: string
  // 是否开启 universal-link, 默认 true
  universal?: boolean
  // 是否开启 app-links, 默认 false
  intent?: boolean
  // 是否支持下载, 默认 true
  download?: boolean
  // 触发下载 延迟检测时间, 默认 2500
  delay?: number
  // 下载渠道 id
  channelId?: string | number
  // 微信端初始化检测安装后的回调函数
  onWechatReady?: (...arg: any[]) => void
  // 蒙层样式， 默认 微信吊起失败后，提示右上角打开, // 1表示浮层右上角，2表示浮层按钮, 默认 1
  wechatStyle?: number | string
  // deeplink 接口支持的id配置
  deeplinkId?: number | string
  // 下载中间页 url
  middleWareUrl?: string
  // 兼容 旧版本 scheme 生成规则
  urlSearch?: UrlSearch
  // 失败 hook
  callFailed?: () => void
  // 成功 hook
  callSuccess?: () => void
  // 开始唤起 hook
  callStart?: () => void
  // 开始下载 hook
  callDownload?: () => void
  intentParams?: Intent
  callError?: () => void
  // 用户定义 配置项
  customConfig?: {
    schemeUrl: string // url-scheme 地址，必选
    downloadConfig?: {
      // 下载配置， 可选，不传则采用 landingPage
      ios: string // app-store 链接
      android: string // apk 下载链接
      android_yyb: string // 应用宝 下载链接
    }
    universalLink?: string // universal-link 地址，可选，ios 优先采用 universal-link
    landingPage?: string // 唤起失败落地页，一般是下载页面，可选，与 downloadConfig 二选一
  }
}

export interface CallAppInstance {
  options: CallAppOptions
  start: () => void
  download: () => void
  targetInfo?: TargetInfo
  downloadLink?: string
  urlScheme?: string
  universalLink?: string
  intentLink?: string
}
