/**
 * Created by luyunhai on 2018/11/8.
 */
import BaseCaller from '../../core/base';

export default class BrowserCaller extends BaseCaller {
    constructor () {
        super();
    }
    init () {
    }
    __openApp (options) {
        location.href = options.__SCHEMA_PATH;
    }
    __tryLaunch (options) {
        const iosVer = IOSVersion()
        if (compareVersion(iosVer,'12.3.0')) options.delay = 2000

        this.__openApp(options);
        const timer = setTimeout(() => {
            this.__download(options);
        }, options.delay);

        const visibilitychange = function () {
            const tag = document.hidden || document.webkitHidden;
            tag && clearTimeout(timer)
        }
        document.addEventListener('visibilitychange', visibilitychange, false)
        document.addEventListener('webkitvisibilitychange', visibilitychange, false)
        window.addEventListener('pagehide', function () {
            clearTimeout(timer)
        }, false)
    }

    launch (opts) {
        const options = super.adaptOptions(opts);
        this.__tryLaunch(options)
    }
}
