"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = exports.getUrlParams = exports.compareVersion = exports.IOSVersion = exports.regTest = void 0;

/**
 * @description 判断验证字符串是否匹配正则
 * @param {Object} options - 必填项，以json形式传参
 * @param {Reg} options.reg - 必填项，正则表达式
 * @param {String} options.str - 必填项，被匹配的字符串
 * */
var regTest = function regTest(_ref) {
  var reg = _ref.reg,
      str = _ref.str;
  return reg.test(str);
};

exports.regTest = regTest;

var IOSVersion = function IOSVersion() {
  var str = navigator.userAgent.toLowerCase();
  var ver = str.match(/cpu iphone os (.*?) like mac os/);

  try {
    if (ver) ver = ver[1].replace(/_/g, '.');
  } catch (error) {
    console.log(error);
  }

  return ver;
};

exports.IOSVersion = IOSVersion;

var compareVersion = function compareVersion(curV, reqV) {
  if (curV && reqV) {
    var arr1 = curV.split('.'),
        arr2 = reqV.split('.');
    var minLength = Math.min(arr1.length, arr2.length),
        position = 0,
        diff = 0;

    while (position < minLength && (diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0) {
      position++;
    }

    diff = diff != 0 ? diff : arr1.length - arr2.length;
    return diff > 0;
  } else {
    return false;
  }
};

exports.compareVersion = compareVersion;

var getUrlParams = function getUrlParams(url) {
  url = url || window.location.href;
  if (url.indexOf('?') < 0) return {};
  return url.replace(/^.+?\?/, '').replace(/#.+/, '').split('&').filter(function (param) {
    return param;
  }).map(decodeURIComponent).reduce(function (obj, param) {
    var i = param.indexOf('=');
    var t = [param.slice(0, i), param.slice(i + 1)];
    obj[t[0]] = t[1];
    return obj;
  }, {});
};

exports.getUrlParams = getUrlParams;

var getCookie = function getCookie(name) {
  return (document.cookie.split('; ').filter(function (cookie) {
    return +cookie.indexOf(name + '=') === 0;
  }).pop() || '').replace(/[^=]+=/, '');
};

exports.getCookie = getCookie;