import _Promise from 'babel-runtime/core-js/promise';
import _extends from 'babel-runtime/helpers/extends';
/**
 * Created by luyunhai on 2018/11/11.
 * 为了脚本更加轻便, 此处未使用axios, 暂时使用fetch作为底层实现
 */
import { loadJS } from './loader';
import { regTest } from '../../libs/utils';

var domainAdapter = function () {
    return regTest({ reg: /zhuanzhuan\.com/g, str: location.hostname }) && 'https://app.zhuanzhuan.com' || 'https://zhuan.58.com';
}();

var queryObj2String = function queryObj2String(params) {
    var arr = [];
    for (var key in params) {
        arr.push(key + '=' + params[key]);
    }
    return arr.join('&');
};
var combineParamsStr = function combineParamsStr(url, paramsStr) {
    var str = url.split('#')[0];
    return str + (regTest({ reg: /\?/g, str: str }) && '&' || '?') + paramsStr;
};
var Api = {
    jsticket: domainAdapter + '/zz/transfer/jsticket'
};

var Ajax = {
    get: function get(url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var method = window.fetch && window.fetch || this.jsonp;
        var paramsStr = queryObj2String(options.data || {});
        var uri = combineParamsStr(url, paramsStr);
        return method(uri, _extends({}, {
            method: 'get',
            headers: {},
            credentials: 'include'
        }, options)).then(function (data) {
            return data.json();
        });
    },
    jsonp: function jsonp(url, options) {
        return new _Promise(function (resolve) {
            var callback = '__json_' + new Date().getTime();
            var params = _extends({
                callback: callback
            }, options.body, options.data);
            var paramsStr = queryObj2String(params);
            var uri = combineParamsStr(url, paramsStr);
            window[callback] = function (resp) {
                resolve(resp);
            };
            loadJS(uri);
        });
    }
};

export var jsticket = function jsticket(_ref) {
    var url = _ref.url;

    return Ajax.jsonp(Api.jsticket, {
        data: { url: url }
    });
};