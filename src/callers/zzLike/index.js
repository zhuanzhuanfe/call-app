import BaseCaller from '../../core/base'
import { dependencies } from '../../libs/config'
import ZZSellerAPP from './sdk'

// 具体平台识别
let plat = '';
let schemaPerfix = 'zhuanzhuan://';
const ua = navigator.userAgent.toLowerCase();
if (/zhuanzhuanseller/g.test(ua)) {
  plat = 'zzseller';
  schemaPerfix = 'zhuanzhuanseller://';
} else if (/zzhunter/g.test(ua)) {
  plat = 'zzhunter';
  schemaPerfix = 'zzhunter://';
}else if (/yigeapp/g.test(ua)) {
  plat = 'yige';
  schemaPerfix = 'zzyige://';
}

export default class ZZAppCaller extends BaseCaller {
  constructor() {
    super(dependencies.ZZ_LIKE_SDK(plat), () => {
      this.ZZSellerAPP = {
        zzseller: window.ZZSELLER,
        zzhunter: window.HUNTERAPP,
        yige: window.YIGEAPP
      }[plat]
      this.App = new ZZSellerAPP(this.ZZSellerAPP)
    })
  }
  __isInstallApp() {}
  __openApp(opts) {
    const options = super.adaptOptions(opts)
    const url = encodeURIComponent(options.__SCHEMA_PATH)
    const schema = `${schemaPerfix}jump/core/openZhuanZhuan/jump`
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
