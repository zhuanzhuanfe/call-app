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
        this.__openApp(options);
        setTimeout(() => {
            this.__download(options);
        }, options.delay);
    }
    launch (opts) {
        const options = super.adaptOptions(opts);
        this.__tryLaunch(options)
    }
}
