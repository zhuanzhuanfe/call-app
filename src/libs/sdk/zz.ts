import { AppFlags } from '../../core/targetApp'
import { CallAppInstance } from '../../index'
import { dependencies, SDKNames } from '../config'
// import { checkOpen } from '../evoke'
import { loadJSArr, logError, logInfo } from '../utils'

// const miniprogramType = 0 // 默认小程序 0 正式版 / 1 开发版 / 2 体验版
// const zzWXMiniAppId = wxInfo.miniID

export const genWXminiJumpPath = (path: string) => ``

const openAPP = (
  ctx: CallAppInstance,
  app: Record<string, any>,
  curAppFlag: AppFlags,
  targetAppFlag: AppFlags
): void => {
  const { urlScheme, download } = ctx
  if (!urlScheme)
    return logError(
      'openZZInnerAPP failed, please check options.path or options.targetApp is legal'
    )

  const {
    callFailed = () => {},
    callSuccess = () => {},
    callError = () => {},
    //delay = 2500,
  } = ctx.options

  const unifiedUrl = urlScheme

  logInfo('unifiedUrl ==', unifiedUrl)

  // 自己端内打开自己页面 走 enterUnifiedUrl
  if (targetAppFlag & curAppFlag) {
    app.enterUnifiedUrl(
      {
        unifiedUrl,
        needClose: '1',
      },
      (res: any) => {
        // 需要确认 native端回调函数 支持情况 (目前 js-sdk回调无效)
        if (res && res.code == 0) {
          callSuccess()
        } else if (res && res.code != 0) {
          callFailed()
          download.call(ctx)
        }
      }
    )
    return
  }

  logInfo('call APP ==', app.callApp)
  // 通过sdk唤起 , 失败成功 回调
  app
    .callApp({ url: unifiedUrl }, (res: any) => {
      // 需要确认 native端回调函数 支持情况 (目前 js-sdk回调无效)
      if (res && res.code == 0) {
        //必须要有code 返回 才处理回调逻辑
        callSuccess()
      } else if (Object.keys(res).length > 0 && res.code != 0) {
        callFailed()
        download.call(ctx)
      }
      logInfo('app.enterUnifiedUrl callback', res)
    })
    .catch((_: any) => {
      callError()
      logError(_)
    })
}

// 加载sdk 资源
export const loadZZSkd = (sdkName: SDKNames): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    try {
      loadJSArr([dependencies[sdkName].link], () => {
        if (sdkName === SDKNames.Z_SDK) {
          logInfo('window.ZZAPP ==', window['@zz-common/zz-jssdk'].default)
          resolve(window['@zz-common/zz-jssdk'].default)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}

export const openZZInnerApp = (
  ctx: CallAppInstance,
  curAppFlag: AppFlags,
  targetAppFlag: AppFlags
) => {
  const { callError = () => {} } = ctx.options
  loadZZSkd(SDKNames.Z_SDK)
    .then((app) => {
      openAPP(ctx, app, curAppFlag, targetAppFlag)
    })
    .catch((_) => {
      callError()
      logError('err', _)
    })
}
