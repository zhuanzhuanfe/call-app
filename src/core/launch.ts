/**
 * 根据不同环境 加载不同 sdk, 调用不同 evoke方法
 */

import {
  isQQ, isWeibo, isQzone,
  isAndroid, isIos, isQQBrowser,
  getIOSVersion, semverCompare,
  IOSVersion
} from "../libs/platform"
import { evokeByTagA, evokeByIFrame, evokeByLocation, checkOpen as _checkOpen } from "../libs/evoke"
import { generateIntent, generateScheme, generateUniversalLink } from './generate'
import { CallAppInstance } from '../types'
/**
 * 普通 url-scheme 唤起， 不同平台对应不同的 evoke
 * @param {Object} instance
 */
export const launch = (instance: CallAppInstance) => {
  const { options, targetInfo, download } = instance;
  const { universal, callFailed, callSuccess } = options;

  // 生成 scheme
  let checkOpenFall: () => void;
  const supportUniversal = !!universal
  const schemeURL = generateScheme(instance)
  const universalLink = generateUniversalLink(instance)
  const intentLink = generateIntent(instance)

  // 唤端失败 才执行 checkOpen(cb)
  const checkOpen = (failure: any) => {
    const { callFailed, delay } = options;
    // 唤端失败执行 checkOpen(cb, time) , hack by setTimeout
    return _checkOpen(() => {
      if (typeof callFailed !== 'undefined') {
        callFailed();
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

  if(isIos) {
    // ios-version > v12.3.0
    if (semverCompare(IOSVersion(), '12.3.0') > 0) options.delay = 3000;

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

  if(checkOpenFall) checkOpenFall.call(instance)
}
