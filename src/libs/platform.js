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
      platformTypes.filter(plat => plat.reg.test(ua))[0]
    )
    return plat.name
  }
}
