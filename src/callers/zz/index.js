/**
 * Created by luyunhai on 2018/12/3.
 */
import BaseCaller from '../../core/base'
import { dependencies } from '../../libs/config'
import ZZAPP from './sdk'

export default class ZZAppCaller extends BaseCaller {
  constructor() {
    super(dependencies.ZZ_SDK, () => {
      this.ZZAPP = window.ZZAPP
      this.App = new ZZAPP(this.ZZAPP)
    })
  }
  __isInstallApp() {}
  __openApp(opts) {
    const options = super.adaptOptions(opts)
    const url = encodeURIComponent(options.__SCHEMA_PATH)
    const schema = 'zhuanzhuan://jump/core/openZhuanZhuanSeller/jump'
    const unifiedUrl = `${schema}?url=${url}`
    this.App.openApp({ unifiedUrl })
  }
  __download() {}
  __tryLaunch(opts) {
    this.__openApp(opts)
  }
  init() {}
  launch(opts) {
    this.__openApp(opts)
  }
}
