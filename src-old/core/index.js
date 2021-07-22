import BaseCaller from './base'
import { Platform } from '../libs/platform'
import { copy } from '../libs/utils'

class Core {
  constructor() {
    const plat = new Platform({})
    this.plat = plat.getCurrentPlatform()
    this.caller = null
    this.loader()
  }

  // 直接下载能力
  static download({ channelId = 923, middleWareUrl, path }) {
    const base = new BaseCaller()
    base.__download({ channelId, middleWareUrl, path, download: true })
  }

  loader() {
    const ZZCaller = require('../callers/qq').default
    this.caller = new ZZCaller()
    this.caller.init()
  }

  /**
   * 端外主动调起app方法
   * 所有参数都非必填，默认调起首页（转转）
   * @param channelId：渠道号
   * @param path:吊起的路径(使用统跳协议)
   * @param middleWareUrl：中转url，如空则直接跳转下载安装包或 App Store
   * @param callback：发起调起请求时的回调
   * @param success：调起成功的回调
   * @param fail：调起失败的回调
   */
  start(opts) {
    // 复制地址到剪切板，用于下载后，启动app页面还原
    const base = new BaseCaller()
    copy(`1.0$$${base.adaptOptions(opts).__SCHEMA_PATH}`)

    // 如果是在mjump域名下(universal link情况)，那么就只能走下载
    if (document.domain === 'mjump.zhuanzhuan.com') {
      Core.download(opts);
      return ;
    }

    this.caller.wrap(
      this.caller.launch.bind(this.caller),
      Object.assign(
        {},
        {
          targetApp: 'zz', // 目标App（zz: 主App, seller: 商家App）
          channelId: 923, //渠道号
          delay: 2500, //触发下载的延时时间，低于2500可能会出现调起的同时触发下载
          middleWareUrl: '', //下载中转页,如不设置，将直接下载安装包或跳appstore
          wechatCheckInstallState: () => {}, //微信端初始化检测安装后的回调函数
          universal: true,
          download: true, // 默认吊起失败后，转入下载逻辑
          wechatStyle: 1, // 默认微信吊起失败后，提示右上角打开
          deeplinkId: '', // deeplink接口支持的id配置
        },
        opts
      )
    );
  }
}

if (typeof window !== 'undefined') {
  window.CallApp = Core
}
export default Core
