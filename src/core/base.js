/**
 * Created by luyunhai on 2018/11/8.
 */
import { loadJSArr } from './widgets/loader';
import { Event } from './widgets/Event';
import PatternsAdapter from './widgets/PatternsAdapter';
import * as config from '../libs/config';
import { Platform } from '../libs/platform';

export default class BaseCaller {
    constructor (dependencies, callback = () => {}) {
        this.__mounted = false;
        this.callbackList = [];
        this.config = config;
        if (!dependencies) {
            return this.__init(callback);
        }
        loadJSArr(dependencies, () => this.__init(callback));
    }

    __init (callback) {
        this.__mounted = true;
        callback();
        this.callbackList.forEach(({cb, args}) => cb.call(this, args));
        Event.emit('mounted');
    }

    __appendCallback (cb, args) {
        this.callbackList.push({ cb, args });
    }

    __download ({ channelId, middleWareUrl }) {
        // Android版微信5.0之前  可以跳转到浏览器下载页面 默认不添加
        var wechat = '';
        const plat = new Platform({});
        const platName = plat.getCurrentPlatform();
        if ( platName === 'wechat') {
            wechat = '#mp.weixin.qq.com'
        }
        location.href = middleWareUrl || this.config.downloadUrl.browser + '?channelId=' + channelId + wechat;
        // location.href = 'market://search?q=pname:com.wuba.zhuanzhuan';
    }

    wrap (fn, args) {
        if (this.__mounted) {
            return fn && fn(args);
        }
        this.__appendCallback(fn, args);
    }

    adaptOptions (options) {
        const patternsAdapter = new PatternsAdapter(options);
        return patternsAdapter.wrap();
    }
}
