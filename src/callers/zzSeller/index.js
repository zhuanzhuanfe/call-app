/**
 * Created by luyunhai on 2018/12/3.
 */
import BaseCaller from '../../core/base';
import { dependencies } from '../../libs/config';
import ZZSellerAPP from './sdk';

export default class ZZAppCaller extends BaseCaller {
    constructor () {
        super(dependencies.ZZ_SELLER_SDK, () => {
            this.ZZSellerAPP = window.ZZSELLER;
            this.App = new ZZSellerAPP(this.ZZSellerAPP);
        });
    }
    __isInstallApp () {
    }
    __openApp (opts) {
        const options = super.adaptOptions(opts);
        const url = encodeURIComponent(options.__SCHEMA_PATH);
        const schema = 'zhuanzhuanseller://jump/core/openZhuanZhuan/jump';
        const unifiedUrl = `${schema}?url=${url}`;
        this.App.openApp({ unifiedUrl });
    }
    __download ({ channelId }) {
    }
    __tryLaunch (opts) {
        this.__openApp(opts);
    }
    init () {
    }
    launch (opts) {
        this.__openApp(opts);
    }
}
