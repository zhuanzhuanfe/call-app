/**
 * Created by luyunhai on 2018/11/7.
 */
import BaseCaller from '../../core/base'
import { dependencies } from '../../libs/config'
import { WBAPP } from './sdk'

export default class WBAppCaller extends BaseCaller {
  constructor() {
    super(dependencies.WB_SDK, () => {
      this.WBAPP = window.WBAPP
      this.App = new WBAPP(this.WBAPP)
    })
  }
  __isInstallApp() {
    return this.App.isInstallApp({
      urlschema: this.config.AppInfomation.SCHEMA,
      package: this.config.AppInfomation.ANDROID_PACKAGE_NAME,
    })
  }
  __openApp(opts) {
    const options = super.adaptOptions(opts)
    const version = this.App.getVersion()
    // 由于plist白名单问题, 这里做兼容, anroid端都可以支持统跳, ios端8.13.0+(包括v8.13.0)才支持统跳, ios端8.13.0以下智能通过sdk拉起
    if (
      this.config.device.isAndroid ||
      this.App.compareVersion(version, '8.13.0') >= 0
    ) {
      location.href = options.__SCHEMA_PATH
      return
    }
    return this.App.openApp({
      urlschema: options.__SCHEMA_PATH || this.config.AppInfomation.SCHEMA,
      package: this.config.AppInfomation.ANDROID_PACKAGE_NAME,
      maincls: this.config.AppInfomation.ANDROID_MAINCLS,
    })
  }
  __download() {
    // 58App 渠道下载, 无法传递channelId (Android & IOS 下载都跳转应用市场)
    const type = this.config.device.getType()
    location.href = this.config.downloadUrl[type]
  }
  __tryLaunch(opts) {
    this.__openApp(opts)
    setTimeout(this.__download.bind(this), 800)
  }
  init() {}
  launch(opts) {
    this.__isInstallApp().then(({ data, code }) => {
      // status: "0" 是已安装, “1”是未安装
      if (code != 0) return
      if (data.status == 0) {
        return this.__openApp(opts)
      }
      return this.__tryLaunch(opts)
    })
  }
}
