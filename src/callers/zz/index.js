/**
 * Created by luyunhai on 2018/12/3.
 */
import BaseCaller from '../../core/base';
import { dependencies } from '../../libs/config';
import ZZAPP from './sdk';

export default class ZZAppCaller extends BaseCaller {
    constructor () {
        console.log('init zzApp');
        super(dependencies.ZZ_SDK, () => {
            this.ZZAPP = window.ZZAPP;
            this.App = new ZZAPP(this.ZZAPP);
            console.log('ZZAPP is loaded!');
        });
    }
    __isInstallApp () {
        console.log('isInstallApp is init !');
    }
    __openApp (opts) {
        const options = super.adaptOptions(opts);
        console.log(options);
        const url = encodeURIComponent(options.__SCHEMA_PATH);
        const schema = 'zhuanzhuan://jump/core/openZhuanZhuanSeller/jump';
        const unifiedUrl = `${schema}?url=${url}`;
        console.log('unifiedUrl', unifiedUrl);
        this.App.openApp({ unifiedUrl });
    }
    __download ({ channelId }) {
        console.log('__download', { channelId });
    }
    __tryLaunch (opts) {
        this.__openApp(opts);
    }
    init () {
        console.log('zzApp caller is inited!');
    }
    launch (opts) {
        console.log('zzapp launch: ', opts, this);
        this.__openApp(opts);
    }
}
