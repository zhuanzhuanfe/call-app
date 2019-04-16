/**
 * Created by luyunhai on 2018/11/11.
 * 为了脚本更加轻便, 此处未使用axios, 暂时使用fetch作为底层实现
 */
import { loadJS } from './loader';
import { regTest } from '../../libs/utils';

const domainAdapter = (() => {
    return regTest({ reg: /zhuanzhuan\.com/g, str: location.hostname })
        && 'https://app.zhuanzhuan.com'
        || 'https://zhuan.58.com';
})();

const queryObj2String = (params) => {
    const arr = [];
    for (let key in params) {
        arr.push(`${key}=${params[key]}`);
    }
    return arr.join('&');
};
const combineParamsStr = (url, paramsStr) => {
    const str = url.split('#')[0];
    return str + (regTest({ reg: /\?/g, str }) && '&' || '?') + paramsStr;
};
const Api = {
    jsticket: domainAdapter + '/zz/transfer/jsticket'
};

const Ajax = {
    get (url, options = {}) {
        const method = window.fetch && window.fetch || this.jsonp;
        const paramsStr = queryObj2String(options.data || {});
        const uri = combineParamsStr(url, paramsStr);
        return method(uri, Object.assign({}, {
            method: 'get',
            headers: {},
            credentials: 'include'
        }, options)).then(data => {
            return data.json();
        });
    },
    jsonp (url, options) {
        return new Promise(resolve => {
            const callback = '__json_' + new Date().getTime();
            const params = Object.assign({
                callback
            }, options.body, options.data);
            const paramsStr = queryObj2String(params);
            const uri = combineParamsStr(url, paramsStr);
            window[callback] = (resp) => {
                resolve(resp);
            };
            loadJS(uri);
        });
    }
};

export const jsticket = ({ url }) => {
    return Ajax.jsonp(Api.jsticket, {
        data: { url }
    });
};
