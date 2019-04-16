/**
 * Created by luyunhai on 2018/11/7.
 */
import { platformTypes } from './config';

export class Platform {
    constructor (opts = {}) {
        this.ua = opts.ua || navigator.userAgent;
        // this.types = platformTypes;
    }
    getCurrentPlatform () {
        const ua = this.ua.toLowerCase();
        const defaultType = { name: 'browser' };
        const plat = Object.assign({}, defaultType, platformTypes.find(plat => plat.reg.test(ua)));
        console.log(platformTypes.find(plat => plat.reg.test(ua)));
        return plat.name;
    }
}
