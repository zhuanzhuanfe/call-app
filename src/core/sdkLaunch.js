import { isQQ, isWeibo, isZZ,
  isZZHunter, isZZSeller,
  isZZSeeker, isAndroid, isIos,
  isZZInner, getIOSVersion, semverCompare ,
  IOSVersion } from "../libs/platform"
import { evokeByTagA, evokeByIFrame, evokeByLocation, checkOpen as _checkOpen } from "../libs/evoke"
import { generateIntent, generateScheme, generateUniversalLink } from './generate'
import { dependencies } from '../libs/config'


/**
 * native-sdk 方式 唤起 (目前支持 58app/微信)
 * @param {Object} instance
 */
export const sdkLaunch = async (instance) => {
  const { options, APP, targetInfo, download } = instance;
  const { universal, callFailed, callSuccess } = options;

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

  // 生成 scheme
  let checkOpenFall;
  const supportUniversal = !!universal
  const schemeURL = generateScheme(instance)
  try {
    if(is58App) {
      APP._name_ = ''
      await load58SDK(APP)

    } else if(isWechat) {
      APP._name_ = ''
      loadWXSDK(resolve, APP)

    } else if(isZZInner) {

    } else {
      console.error('')
    }
  } catch (error) {
    console.error()
  }
}

// 加载 app-sdk 资源
const load58SDK = (app) =>
  new Promise.then((resolve, reject) => {
    try {
      loadJSArr(dependencies.WB_SDK, () => {

        resolve(app)
      })
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })

const loadWXSDK = (resolve, app) => {
  // jsonp 拉取微信信息接口回调函数
  window.__json_jsticket = resp => {
    app.WX_JSTICKET = (resp.respCode == 0 && resp.respData) || {}
  }
  loadJSArr([dependencies.WX_JWEIXIN, dependencies.WX_JSTICKET], () => {

    resolve()
  })
}

const wx_onReady = (app) =>
  new Promise(resolve => {
    if(window.WeixinJSBridge) {
      resolve()
    } else {
      document.addEventListener(
        'WeixinJSBridgeReady',
        resolve,
        false
      )
    }
  })


const loadZZSDK = (resolve, app) =>
  loadJSArr([], () => {

    resolve()
  })
