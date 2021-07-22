
export interface TargetInfo {
  flag: number,
  name: string,
  schemePrefix: string,
  universalPath: string,
  downloadConfig: downloadConfig
}

export interface downloadConfig {
  // 苹果市场
  ios: string,
  // 安卓市场
  android: string,
  // 应用宝
  wechat_android: string,
  // api
  api: string
}

export interface CallAppInstance {
  options: CallAppOptions
  start: () => void,
  download: () => void,
  targetInfo: TargetInfo
  downloadLink: string
  APP: null | Record<string, any>
}

export enum TargetAppNames {
  ZZ = 'zz',
  ZZHunter = 'zzHunter',
  ZZSeller = 'zzSeller',
  ZZSeeker = 'zzSeeker',
  ZZInner = 'zzInner'
}

export interface CallAppOptions {
  // 唤起的页面 path
  path: string,
  // 唤起的目标app
  targetApp?: TargetAppNames.ZZ | TargetAppNames.ZZHunter |
    TargetAppNames.ZZSeeker | TargetAppNames.ZZSeller,
  // 是否开启 universal-link, 默认 true
  universal?: boolean,
  // 是否开启 app-links, 默认 false
  intent?: boolean,
  // 是否支持下载, 默认 true
  download?: boolean,
  // 触发下载 延迟检测时间, 默认 2500
  delay?: number,
  // 下载渠道 id
  channelId?: string | number | undefined,
  // 微信端初始化检测安装后的回调函数
  wechatCheckInstallState?: () => void,
  // 蒙层样式， 默认 微信吊起失败后，提示右上角打开, 默认 1
  wechatStyle?: number | string | undefined,
  // deeplink 接口支持的id配置
  deeplinkId?: number | string | undefined,
   // 下载中间页 url
  middleWareUrl?: string,
  // 兼容 旧版本 scheme 生成规则
  urlSearch?: {
    id: number | string,
    openType?: number | string | undefined
  },
  // 失败 hook
  callFailed?: () => void,
  // 成功 hook
  callSuccess?: () => void,
  // 开始唤起 hook
  callStart?: () => void,
}
