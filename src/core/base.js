import { loadJSArr } from './widgets/loader';
import { Event } from './widgets/Event';
import PatternsAdapter from './widgets/PatternsAdapter';
import * as config from '../libs/config';
import { Platform } from '../libs/platform';

export default class BaseCaller {
    constructor(dependencies, callback = () => { }) {
        this.__mounted = false;
        this.callbackList = [];
        this.config = config;
        if (!dependencies) {
            return this.__init(callback);
        }
        loadJSArr(dependencies, () => this.__init(callback));
    }

    __init(callback) {
        this.__mounted = true;
        callback();
        this.callbackList.forEach(({ cb, args }) => cb.call(this, args));
        Event.emit('mounted');
    }

    __appendCallback(cb, args) {
        this.callbackList.push({ cb, args });
    }

    __download(options) {
        const { channelId, middleWareUrl, path, download } = options;
        if (!download) return;
        let wechat = '';
        const plat = new Platform({});
        const platName = plat.getCurrentPlatform();
        if (platName === 'wechat') {
            wechat = '#mp.weixin.qq.com'
        }
        const isCheck = /^(zzcheck)/.test(path);
        const downloadCofig = isCheck ? this.config.checkDownloadUrl : this.config.downloadUrl
        location.href = middleWareUrl || downloadCofig.browser + '?channelId=' + channelId + wechat;
    }

    wrap(fn, args) {
        if (this.__mounted) {
            return fn && fn(args);
        }
        this.__appendCallback(fn, args);
    }

    adaptOptions(options) {
        const patternsAdapter = new PatternsAdapter(options);
        return patternsAdapter.wrap();
    }
}
