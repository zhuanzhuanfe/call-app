/**
 * 根据不同环境 加载不同 sdk, 调用不同 evoke方法
 */

import { isQQ, isWeibo, isZZ,
  isZZHunter, isZZSeller,
  isZZSeeker, isAndroid, isIos,
  isZZInner, getIOSVersion, semverCompare ,
  IOSVersion } from "../libs/platform"
import { evokeByTagA, evokeByIFrame, evokeByLocation, checkOpen as _checkOpen } from "../libs/evoke"
import { generateIntent, generateScheme, generateUniversalLink } from './generate'
import { dependencies } from '../libs/config'

/**
 * 普通 url-scheme 唤起， 不同平台对应不同的 evoke
 * @param {Object} instance
 */
export const launch = (instance) => {
  const { options, targetInfo, download } = instance;
  const { universal, callFailed, callSuccess } = options;

  // 生成 scheme
  let checkOpenFall;
  const supportUniversal = !!universal
  const schemeURL = generateScheme(instance)
  const universalLink = generateUniversalLink(instance)
  const intentLink = generateIntent(instance)

  // 唤端失败 才执行 checkOpen(cb)
  const checkOpen = (failure) => {
    const { logFunc, delay } = options;
    // 唤端失败执行 checkOpen(cb, time) , hack by setTimeout
    return _checkOpen(() => {
      if (typeof logFunc !== 'undefined') {
        logFunc('failure');
      }

      failure();
    }, delay);
  }
  //
  const fallToAppStore = () => {
    checkOpen(() => {
      // 下载
      // evokeByLocation(targetInfo.downloadConfig.ios);
      download()
    });
  }
  // 唤端失败调用自定义回调函数
  const fallToCustomCb = (callback) => {
    this.checkOpen(() => {
      callback();
    });
  }

  if(isIos) {
    // ios-version > v12.3.0
    if (semverCompare(IOSVersion(), '12.3.0') > 0) options.timeout = 3000;

    if(isWeibo) {
      // 触发下载 或者 显示遮罩， 需要测试
      // download()
      // showShadow()
    } else if(getIOSVersion() < 9) {
      evokeByIFrame(schemeURL);
      checkOpenFall = fallToAppStore;
    } else if(!supportUniversal || isQQ || isQQBrowser || isQzone) {
      evokeByTagA(schemeURL);
      checkOpenFall = fallToAppStore;
    } else {
      evokeByLocation(universalLink)
    }

  } else if(isAndroid) {
    //


  }

  if (typeof callback !== 'undefined') {
    fallToCustomCb.call(instance, callback);
    return;
  }

  if(checkOpenFall) checkOpenFall.call(instance)
}
