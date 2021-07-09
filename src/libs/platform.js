import { platformTypes } from './config'

export class Platform {
  constructor(opts = {}) {
    this.ua = opts.ua || navigator.userAgent
  }

}
