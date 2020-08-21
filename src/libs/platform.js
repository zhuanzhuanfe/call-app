import { platformTypes } from './config'

export class Platform {
  constructor(opts = {}) {
    this.ua = opts.ua || navigator.userAgent
  }
  getCurrentPlatform() {
    const ua = this.ua.toLowerCase()
    const defaultType = { name: 'browser' }
    const plat = Object.assign(
      {},
      defaultType,
      platformTypes.filter(plat => {
        if (plat.reg.test(ua)) {
          plat.reg.lastIndex = 0;
          return true
        }
        return false
      })[0]
    )
    return plat.name
  }
}
