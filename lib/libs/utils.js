"use strict";

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.copy = copy;
exports.getCookie = exports.getUrlParams = exports.compareVersion = exports.IOSVersion = exports.regTest = void 0;

/**
 * @description 判断验证字符串是否匹配正则
 * @param {Object} options - 必填项，以json形式传参
 * @param {Reg} options.reg - 必填项，正则表达式
 * @param {String} options.str - 必填项，被匹配的字符串
 * */
var document, location, navigator;

if (typeof window !== 'undefined') {
  document = window.document;
  navigator = window.navigator;
  location = window.location;
}

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
  url = url || location.href;
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

function select(element) {
  var selectedText;

  if (element.nodeName === 'SELECT') {
    element.focus();
    selectedText = element.value;
  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    var isReadOnly = element.hasAttribute('readonly');

    if (!isReadOnly) {
      element.setAttribute('readonly', '');
    }

    element.select();
    element.setSelectionRange(0, element.value.length);

    if (!isReadOnly) {
      element.removeAttribute('readonly');
    }

    selectedText = element.value;
  } else {
    if (element.hasAttribute('contenteditable')) {
      element.focus();
    }

    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
    selectedText = selection.toString();
  }

  return selectedText;
}

function copy(text, options) {
  var debug,
      fakeElem,
      success = false;
  options = options || {};
  debug = options.debug || false;

  try {
    var isRTL = document.documentElement.getAttribute('dir') == 'rtl';
    fakeElem = document.createElement('textarea'); // Prevent zooming on iOS

    fakeElem.style.fontSize = '12pt'; // Reset box model

    fakeElem.style.border = '0';
    fakeElem.style.padding = '0';
    fakeElem.style.margin = '0'; // Move element out of screen horizontally

    fakeElem.style.position = 'absolute';
    fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'; // Move element to the same position vertically

    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
    fakeElem.style.top = "".concat(yPosition, "px");
    fakeElem.setAttribute('readonly', '');
    fakeElem.value = text;
    document.body.appendChild(fakeElem);
    select(fakeElem);
    var successful = document.execCommand('copy');
    console.log('successful', successful);

    if (!successful) {
      throw new Error('copy command was unsuccessful');
    }

    success = true;
  } catch (err) {
    debug && console.error('unable to copy using execCommand: ', err);
    debug && console.warn('trying IE specific stuff');

    try {
      window.clipboardData.setData('text', text);
      success = true;
    } catch (err) {
      debug && console.error('unable to copy using clipboardData: ', err);
    }
  } finally {
    if (fakeElem) {
      document.body.removeChild(fakeElem);
    }
  }

  return success;
}