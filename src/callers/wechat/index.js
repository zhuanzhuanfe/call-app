/**
 * Created by luyunhai on 2018/11/8.
 */
import BaseCaller from '../../core/base';
import { dependencies } from '../../libs/config';
import { regTest } from '../../libs/utils';
import WechatApp from './sdk';

export default class WeChatCaller extends BaseCaller {
    constructor () {
        // jsonp拉取微信信息接口回调函数
        window.__json_jsticket = (resp) => {
            this.WX_JSTICKET = (resp.respCode == 0) && resp.respData || {};
        };
        super([
            dependencies.WX_JWEIXIN,
            // dependencies.WX_WIKI,
            dependencies.WX_JSTICKET
        ], () => {
            this.cbs = [];
            this.__onReady().then(() => {
                this.Wechat = window.WeixinJSBridge;
                this.App = new WechatApp(this.Wechat, this.WX_JSTICKET);
                this.cbs.forEach(obj => {
                    obj.cb.apply(this, obj.args);
                });
            });
        });
    }
    init () {
    }
    __onReady () {
        return new Promise((resolve, reject) => {
            window.WeixinJSBridge
            && resolve()
            || document.addEventListener('WeixinJSBridgeReady', () => {
                resolve();
            }, false);
        });
    }
    __download ({ channelId }) {
        const downloadURL = regTest({ reg: /58\.com/g, str: location.hostname })
            && (this.config.downloadUrl.browser + '?channelId=' + channelId)
            || (
                this.config.device.isAndroid
                && this.config.downloadUrl.wechat_android
                || this.config.downloadUrl.ios
            );
        location.href = downloadURL;
    }
    __openApp (options) {
        const appID = this.config.wechatInfomation.appID;
        const parameter = options.__SCHEMA_PATH;
        const extInfo = options.__SCHEMA_PATH;
        if (this.config.domain.is58Domain) {
            location.href = options.__SCHEMA_PATH;
            setTimeout(() => {
                this.__download(options);
            }, 800);
            return;
        }
        return this.App.launchApplication({ appID, parameter, extInfo }).then(data => {
        }).catch(data => this.__download(options));
    }
    __isInstallApp (options) {
        const packageName = this.config.AppInfomation.ANDROID_PACKAGE_NAME;
        const packageUrl = options.__SCHEMA_PATH;
        return this.App.getInstallState({ packageName, packageUrl });
    }
    __tryLaunch (options) {
        return this.__openApp(options).catch(data => this.__download(options));
    }
    __invoke ({ cb, args }) {
        this.cbs.push({ cb, args });
    }
    __start (options) {
        this.config.device.isAndroid
        && this.__isInstallApp(options)
            .then(data => this.__openApp(options))
            .catch(data => this.__download(options))
        || this.__tryLaunch(options);
    }
    launch (opts) {
        const options = super.adaptOptions(opts);
        this.Wechat
        && this.__start(options)
        || this.__invoke({
            cb: this.__start,
            args: [options]
        })
    }
}
