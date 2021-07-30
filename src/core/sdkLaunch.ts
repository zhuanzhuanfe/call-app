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
import {dependencies, AppInfomation, wechatInfomation, domain} from '../libs/config'
import {loadJSArr, showMask} from "../libs/utils"
import {targetAppSchemePrefix} from './targetApp'
import {CallAppInstance, WXJSTICKET} from '../types/index'

declare var window: Window & {
  __json_jsticket: any,
  WeixinJSBridge: any,
  wx: any,
  wxconfig: any
};
/**
 * native-sdk 方式 唤起 (目前支持 58app/微信)
 * @param {Object} instance
 */
export const sdkLaunch = async (instance: CallAppInstance) => {
  const {options, APP, targetInfo, download, urlScheme} = instance;
  const {universal, callFailed, callSuccess, callError, delay} = options;

  //打开转转app
  const OpenZZAPP = (schemeURL: string, App: Record<string, any>, originApp?: string): void => {
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
      // await load58SDK(APP)

    } else if (isWechat) {
      try {
        const conf: WXJSTICKET = await loadWXSDK(APP)
        const wxconfig = {
          debug: false,
          appId: conf.appId,
          timestamp: conf.timestamp,
          nonceStr: conf.noncestr,
          signature: conf.signature,
          beta: true,
          jsApiList: ['launchApplication', 'getInstallState'],
          openTagList: ['wx-open-launch-app'],
        };
        (window.wx && window.wx.config(wxconfig)) || (window.wxconfig = wxconfig)
        window.wx.ready(() => {
          //实例化APP对象
          Object.assign(instance, {
            APP: window.WeixinJSBridge
          })
          if (isAndroid) {
            const packageName = AppInfomation.ANDROID_PACKAGE_NAME
            const packageUrl = urlScheme
            __invoke('getInstallState', {packageName, packageUrl}, instance.APP).then(() => {
              __openApp(urlScheme, instance)
            }).catch(() => {
              callFailed()
            })
          } else { //ios
            __openApp(urlScheme, instance)
          }
        })
      }catch (e) {
        callFailed()
      }
    } else if (isZZInner) {
      if (isZZ) { //转转app环境内, 可以唤起找靓机/采货侠/卖家版
        //加载zz的sdk
        loadSkd('ZZ_SDK').then(res => {
          APP._name_ = res

          if (targetInfo.name == 'zzHunter') { //采货侠app

          }
          if (targetInfo.name == 'zzSeller') { //商家版app


          }
          if (targetInfo.name == 'zzSeeker') { //找靓机app


          }
        })
      } else if (isZZSeeker) { //找靓机app环境内, 可主动唤起转转/采货侠/卖家版


      } else if (isZZHunter) {  //命中采货侠  唤起转转app
        loadSkd('ZZ_HUNTER_SDK').then(res => {
          APP._name_ = res
          const _originApp = 'zzHunter'
          OpenZZAPP(urlScheme, APP, _originApp)
        }).catch(() => {
          callFailed()
        })
      } else { // 命中卖家版 唤起转转app
        loadSkd('ZZ_SELLER_SDK').then(res => {
          APP._name_ = res
          const _originApp = 'zzSeller'
          OpenZZAPP(urlScheme, APP, _originApp)
        }).catch(() => {
          callFailed()
        })
      }
    } else {
      console.error('')
    }
  } catch (error) {
    callFailed()
  }
}

const loadWXSDK = (app) => {
  const _ = Object.create(null)
  return new Promise<WXJSTICKET>((resolve, reject) => {
    window.__json_jsticket = resp => {
      _.WX_JSTICKET = (resp.respCode == 0 && resp.respData) || {}
    }
    loadJSArr([dependencies.WX_JWEIXIN.link, dependencies.WX_JSTICKET.link], () => {
      resolve(_.WX_JSTICKET)
    })
  })
}

// const wx_onReady = () =>
//   new Promise<void>((resolve) => {
//     if (window.WeixinJSBridge) {
//       resolve()
//     } else {
//       document.addEventListener<any>(
//         'WeixinJSBridgeReady',
//         resolve,
//         false
//       )
//     }
//   })

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
//微信skd回调
const __invoke = (name, options, App) => {
  return new Promise((resolve, reject) => {
    App.invoke(name, options, data => {
      const {err_msg} = data;
      let Regex = /(:ok)|(:yes)/g
      if (Regex.test(err_msg)) {
        resolve({
          code: 0,
          data: {err_msg}
        })
      } else {
        reject({code: -1, data: {err_msg}})
      }
    })
  })
}

//打开app
const __openApp = (schemeURL, instance: CallAppInstance) => {
  const {options, APP, downloadLink} = instance;
  const {callFailed, callSuccess} = options;
  const appID = wechatInfomation.appID
  const parameter = schemeURL
  const extInfo = schemeURL
  //如果是58域名的话
  if (domain.is58Domain) {
    const delay = 800
    evokeByLocation(schemeURL)
    setTimeout(() => {
      callFailed()
      evokeByLocation(downloadLink)
    }, delay)
    return
  }
  return __invoke('launchApplication', {appID, parameter, extInfo}, APP)
    .then((res) => {
      callSuccess()
    })
    .catch(() => {
      callFailed()
      evokeByLocation(downloadLink)
    })
}


