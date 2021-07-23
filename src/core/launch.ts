/**
 * 根据不同环境 加载不同 sdk, 调用不同 evoke方法
 */

import {
  isQQ, isWeibo, isQzone,
  isAndroid, isIos, isQQBrowser,
  getIOSVersion, semverCompare,
  isBaidu, IOSVersion, isOriginalChrome
} from "../libs/platform"
import { evokeByTagA, evokeByIFrame, evokeByLocation, checkOpen as _checkOpen } from "../libs/evoke"
import { generateIntent, generateScheme, generateUniversalLink } from './generate'
import { CallAppInstance } from '../types'
import { showMask } from '../libs/utils'
/**
 * 普通 url-scheme 唤起， 不同平台对应不同的 evoke
 * @param {Object} instance
 */
export const launch = (instance: CallAppInstance) => {
  const { options, download } = instance;
  const { universal, intent, callFailed, callSuccess, delay } = options;

  // 生成 scheme
  const schemeURL = generateScheme(instance)
  const universalLink = generateUniversalLink(instance)
  const intentLink = generateIntent(instance)

  // 唤端失败时落地处理
  let checkOpenFall: () => void;
  const supportUniversal = universal
  const supportIntent = intent

  // 唤端失败 才执行 checkOpen(cb)
  const checkOpen = (failure: any, success?: any) => {
    // 唤端失败执行 checkOpen(failedCb, successCb, time) , hack by setTimeout
    return _checkOpen(() => {
      callFailed && callFailed()

      failure();
    }, () => {
      callSuccess && callSuccess()

      success()
    }, delay);
  }
  // 处理落地状态
  const handleFall = () => {
    checkOpen(() => {
      // 触发下载 或者 跳指定页面
      download.call(instance)
    }, () => { });
  }

  if (isIos) {
    // ios-version > v12.3.0
    if (semverCompare(IOSVersion(), '12.3.0') > 0) options.delay = 3000;

    if (isWeibo) {
      // 触发下载 或者 显示遮罩， 需要测试
      // download.call(instance)
      showMask()
    } else if (getIOSVersion() < 9) {
      evokeByIFrame(schemeURL);
      checkOpenFall = handleFall
    } else if (!supportUniversal || isQQ || isQQBrowser || isQzone) {
      evokeByTagA(schemeURL);
      checkOpenFall = handleFall
    } else {
      evokeByLocation(universalLink)
      checkOpenFall = handleFall
    }

  } else if (isAndroid) {
    //
    if (isOriginalChrome) {
      if (supportIntent) {
        evokeByLocation(intentLink);
        checkOpenFall = handleFall
      } else {
        // scheme 在 andriod chrome 25+ 版本上 iframe 无法正常拉起
        evokeByLocation(schemeURL)
        checkOpenFall = handleFall
      }
    } else if (isBaidu || isWeibo || isQzone) {
      // 触发下载 或者 显示遮罩， 需要测试
      // download.call(instance)
      showMask()
    } else {
      evokeByIFrame(schemeURL)
      checkOpenFall = handleFall
    }
  } else {
    console.error ?
      console.error('your platform is not considered, please connect developer') :
      console.log('your platform is not considered, please connect developer');
  }

  if (checkOpenFall) {
    return checkOpenFall()
  }

  callFailed && callFailed()
}
