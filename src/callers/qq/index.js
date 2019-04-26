/**
 * Created by luyunhai on 2018/11/8.
 */
import BaseCaller from '../../core/base';

export default class QQCaller extends BaseCaller {
    constructor () {
        super();
    }
    init () {
    }

    /**
     * 创建iframe方法
     * @param scheme
     * @returns {Element}
     */
    __createIframe(scheme){
        let ifr = document.createElement('iframe');
        ifr.setAttribute('src', scheme);
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        return ifr;
    }

    /**
     * 移除iframe方法
     * @param ifr
     */
    __removeIframe(ifr){
        if(ifr)document.body.removeChild(ifr);
    }

    __openApp (options) {
        if (this.config.device.isIOS) {
            const a = document.createElement('a');
            a.setAttribute('href', options.__SCHEMA_PATH);
            return a.click();
        }
        location.href = options.__SCHEMA_PATH;
    }

    __tryLaunch (options) {
        this.__openApp(options);
        let startTime = Date.now();
        let downloadTimer = setTimeout(() => {
            this.__download(options);
        }, options.delay);
        if (this.config.device.isAndroid) {
            setTimeout(()=>{
                let endTime = Date.now();
                var timeLimit = this.config.device.isAndroid ? 800 : 610;
                if (startTime && endTime - startTime > timeLimit){
                    clearTimeout(downloadTimer);
                }
            }, 600);
        }
    }

    launch (opts) {
        const options = super.adaptOptions(opts);
        this.__tryLaunch(options)
    }
}
