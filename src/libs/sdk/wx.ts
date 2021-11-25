import { CallAppInstance } from '../../index'
import { wxInfo, dependencies, zzAppInfo } from '../config'
import { evokeByLocation } from '../evoke'
import { is58Host } from '../hostname'
import { isAndroid } from '../platform'
import { loadJSArr, logError, logInfo } from '../utils'

export interface WXJSTICKET {
  appId?: string
  timestamp?: string
  noncestr?: string
  signature?: string
  [key: string]: any
}

export const loadWXSDK = () => {
  const _ = Object.create(null)
  return new Promise<WXJSTICKET>((resolve) => {
    window.__json_jsticket = (resp: { respCode: number; respData: WXJSTICKET }) => {
      if (resp) {
        _.WX_JSTICKET = (resp.respCode == 0 && resp.respData) || {}
      } else {
        logError('load wx-sdk error')
      }
    }

    loadJSArr([dependencies.WX_JWEIXIN.link, dependencies.WX_JSTICKET.link], () => {
      resolve(_.WX_JSTICKET)
    })
  })
}

// 调用微信 sdk api 回调
export const invokeInWX = (
  name: string,
  options: Record<string, any>,
  app: Record<string, any>
) => {
  return new Promise((resolve, reject) => {
    app.invoke(name, options, (data: any) => {
      logInfo('invokeInWX', data)
      const { err_msg } = data
      const Regex = /(:ok)|(:yes)/g
      if (Regex.test(err_msg)) {
        resolve({
          code: 0,
        })
      } else {
        reject({ code: -1 })
      }
    })
  })
}

export const openAppInWX = (
  schemeURL: string,
  instance: CallAppInstance,
  app: Record<string, any>
) => {
  const { options, downloadLink = '', universalLink = '' } = instance
  const { callFailed = () => {}, callSuccess = () => {} } = options
  const { appID } = wxInfo
  const parameter = schemeURL
  const extInfo = schemeURL

  const handleByuLink = (cb: () => void, delay = 2000) => {
    universalLink && evokeByLocation(universalLink)
    setTimeout(() => {
      cb()
    }, delay)
  }
  // 如果是58域名的话
  if (is58Host) {
    handleByuLink(() => {
      callFailed()
      downloadLink && evokeByLocation(downloadLink)
    })
    return
  }

  invokeInWX('launchApplication', { appID, parameter, extInfo }, app)
    .then((res) => {
      logInfo('launchApplication', res)
      callSuccess()
    })
    .catch((err) => {
      // sdk 失败则降级采用 uLink 尝试唤起
      handleByuLink(() => {
        logError('launchApplication', err)
        callFailed()
        downloadLink && evokeByLocation(downloadLink)
      })
    })
}

export const openZZInWX = async (instance: CallAppInstance) => {
  const { options, urlScheme = '' } = instance
  const { callFailed = () => {}, onWechatReady = () => {} } = options
  // if(isAndroid){
  //   return evokeByLocation(downloadLink)
  // }
  try {
    const conf: WXJSTICKET = await loadWXSDK()
    const wxconfig = {
      debug: false,
      appId: conf.appId,
      timestamp: conf.timestamp,
      nonceStr: conf.noncestr,
      signature: conf.signature,
      beta: true,
      jsApiList: ['launchApplication', 'getInstallState'],
      openTagList: ['wx-open-launch-app'],
    }
    window.wx && window.wx.config(wxconfig)
    window.wx.ready(() => {
      onWechatReady(window.WeixinJSBridge)
      // 实例化APP对象
      let app = window.WeixinJSBridge

      if (isAndroid) {
        const packageName = zzAppInfo.ANDROID_PACKAGE_NAME
        const packageUrl = urlScheme
        invokeInWX('getInstallState', { packageName, packageUrl }, app)
          .then(() => {
            openAppInWX(urlScheme, instance, app)
          })
          .catch(() => {
            callFailed()
          })
      } else {
        // ios
        openAppInWX(urlScheme, instance, app)
      }
    })
  } catch (e) {
    callFailed()
  }
}
