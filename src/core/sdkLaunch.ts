import {
  isQQ,
  isWeibo,
  isZZ,
  isZZHunter,
  isZZSeller,
  isZZSeeker,
  isAndroid,
  isIos,
  isZZInner,
  is58App,
  isWechat,
  getIOSVersion, semverCompare,
  IOSVersion
} from "../libs/platform"
import {evokeByTagA, evokeByIFrame, evokeByLocation, checkOpen as _checkOpen} from "../libs/evoke"
import {generateIntent, generateScheme, generateUniversalLink} from './generate'
import {dependencies} from '../libs/config'
import {loadJSArr} from "../libs/utils"
import {targetAppSchemePrefix} from './targetApp'
/**
 * native-sdk 方式 唤起 (目前支持 58app/微信)
 * @param {Object} instance
 */
export const sdkLaunch = async (instance) => {
  const {options, APP, targetInfo, download} = instance;
  const {universal, callFailed, callSuccess, callError, delay} = options;

  // 唤端失败 才执行 checkOpen(cb)
  const checkOpen = (failure: any, success?: any, error?: any) => {
    // 唤端失败执行 checkOpen(failedCb, successCb, time) , hack by setTimeout
    return _checkOpen(() => {
      callFailed && callFailed()
      failure();
    }, () => {
      callSuccess && callSuccess()
      success()
    }, () => {
      callError && callError()
      error()
    }, delay);
  }
  // 处理落地状态
  const handleFall = () => {
    checkOpen(() => {
      // 触发下载 或者 跳指定页面
      download.call(instance)
    }, () => { });
  }

  // 生成 scheme
  let checkOpenFall: () => void;
  const supportUniversal = !!universal
  const schemeURL = generateScheme(instance)

  //打开转转app
  const OpenZZAPP = (schemeURL, App, originApp) => {
    const url = encodeURIComponent(schemeURL)
    let schemaPerfix = targetAppSchemePrefix[originApp]
    const schema = `${schemaPerfix}//jump/core/openZhuanZhuan/jump`
    const unifiedUrl = `${schema}?url=${url}`
    //通过sdk唤起
    App.enterUnifiedUrl({unifiedUrl})
  }
  try {
    if (is58App) {
      APP._name_ = ''
      await load58SDK(APP)

    } else if (isWechat) {
      APP._name_ = ''
      //loadWXSDK(resolve, APP)

    } else if (isZZInner) {
      if (isZZ) { //转转app环境内, 可以唤起找靓机/采货侠/卖家版
        //加载zz的sdk
        loadSkd('ZZ_SDK').then(res => {
          APP._name_ = res
          if (targetInfo.name == 'zzHunter'){ //采货侠app


          }
          if (targetInfo.name == 'zzSeller'){ //商家版app


          }
          if (targetInfo.name == 'zzSeeker'){ //找靓机app


          }
        })
      } else if (isZZSeeker) { //找靓机app环境内, 可主动唤起转转/采货侠/卖家版


      } else if (isZZHunter) {  //命中采货侠  唤起转转app
        loadSkd('ZZ_HUNTER_SDK').then(res => {
          APP._name_ = res
          const _originApp = 'zzHunter'
          OpenZZAPP(schemeURL, APP, _originApp)
        })
      } else { // 命中卖家版 唤起转转app
        loadSkd('ZZ_SELLER_SDK').then(res => {
          APP._name_ = res
          const _originApp = 'zzSeller'
          OpenZZAPP(schemeURL, APP, _originApp)
        })
      }
    } else {
      console.error('')
    }

    if (checkOpenFall) {
      return checkOpenFall()
    }
  } catch (error) {
    console.error()
  }
}

// 加载 app-sdk 资源
const load58SDK = (app) =>
  new Promise.then((resolve, reject) => {
    try {
      loadJSArr([dependencies.WB_SDK.link], () => {
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
  loadJSArr([dependencies.WX_JWEIXIN.link, dependencies.WX_JSTICKET.link], () => {
    resolve()
  })
}

const wx_onReady = (app) =>
  new Promise((resolve) => {
    if (window.WeixinJSBridge) {
      resolve()
    } else {
      document.addEventListener(
        'WeixinJSBridgeReady',
        resolve,
        false
      )
    }
  })

// 加载sdk 资源
const loadSkd = (sdkName) => {
  return new Promise((resolve, reject) => {
    try {
      loadJSArr([dependencies[sdkName].link], () => {
        resolve(dependencies[sdkName].name)
      })
    } catch (error) {
      reject(error)
    }
  })
}


