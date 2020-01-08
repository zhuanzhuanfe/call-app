import { platformTypes } from './config';

export class Platform {
    constructor (opts = {}) {
        this.ua = opts.ua || navigator.userAgent;
        // this.types = platformTypes;
    }
    getCurrentPlatform () {
        const ua = this.ua.toLowerCase();
        const defaultType = { name: 'browser' };
        const isWechat = /micromessenger/g.test(ua) && 'wechat'
        const plat = Object.assign({}, defaultType, platformTypes.filter(plat => plat.reg.test(ua))[0]);
        return isWechat || plat.name;
    }
}
