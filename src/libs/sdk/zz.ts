import { AppFlags, appSchemePrefix } from '../../core/targetApp'
import { CallAppInstance } from '../../index'
import { dependencies, SDKNames, wxInfo } from '../config'
// import { checkOpen } from '../evoke'
import { loadJSArr, logError, logInfo } from '../utils'

// logInfo('enum SDKNames', SDKNames)
/*

可主动唤起的场景(需求)：

｜ 目标app   ｜ 转转  ｜ 找靓机 ｜ 采货侠  ｜ 卖家版 ｜
｜ 转转      ｜      ｜  ✅   ｜   ✅    ｜  ✅   ｜
｜ 找靓机    ｜  ✅   ｜       ｜        ｜       ｜
｜ 采货侠    ｜  ✅   ｜       ｜        ｜       ｜
｜ 卖家版    ｜  ✅   ｜       ｜        ｜       ｜
| zz-wx小程序|  ✅    |       ｜        ｜       ｜
*/

// 打开 转转内部 app
// zz  zzSeller zzHunter 都走 zz-js-sdk + 统跳地址
// 统跳地址平台： https://jump.zhuanspirit.com/#/zhuanzhuan?page=1&search=open

// 目前业务只需调起转转 wx-mini
const miniprogramType = 0 // 默认小程序 0 正式版 / 1 开发版 / 2 体验版
const zzWXMiniAppId = wxInfo.miniID //转转小程序 appid
//
const openZZJumpPath = `jump/core/openZhuanZhuan/jump`
const openZZHunterJumpPath = `jump/core/openHunter/jump`
const openZZSellerJumpPath = `jump/core/openZhuanZhuanSeller/jump`

// 如果 targetAPP 是 wx小程序 并且 path 是页面地址，需要特殊处理(根据统跳协议地址自动拼接)
export const genWXminiJumpPath = (path: string) =>
  `zhuanzhuan://jump/core/miniProgram/jump?miniprogramType=${
    miniprogramType || 0
  }&path=${encodeURIComponent(path)}&userName=${zzWXMiniAppId}`

// 找靓机 目前不支持 统跳，特殊处理
const openZZSeekerJumpPath = `jump/core/openZlj/jump`

// 打开转转/采货侠/卖家版 / 找靓机
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

  // hack 检测 open状态
  // const handleCheck = () =>
  //   checkOpen(
  //     () => {
  //       callFailed()
  //       download.call(ctx)
  //     },
  //     callSuccess,
  //     callError,
  //     delay
  //   )

  // 不同的目标app 加载相应的统跳地址 path
  let jumpPath = ''
  let schemaPrefix = appSchemePrefix[AppFlags.ZZ]

  switch (targetAppFlag) {
    case AppFlags.ZZ:
      jumpPath = openZZJumpPath
      break
    case AppFlags.ZZHunter:
      jumpPath = openZZHunterJumpPath
      break
    case AppFlags.ZZSeller:
      jumpPath = openZZSellerJumpPath
      break
    case AppFlags.WXMini:
      jumpPath = ''
      break
    // 目标是找靓机特殊处理 schemaPrefix
    case AppFlags.ZZSeeker:
      jumpPath = openZZSeekerJumpPath
      schemaPrefix = appSchemePrefix[AppFlags.ZZSeeker]
      break
    default:
      logError(`targetAppFlag is not found when call openZZInnerApp function`)
      break
  }

  // 如果运行app环境是 找靓机, 需要特殊处理 schemePrefix
  if (curAppFlag & AppFlags.ZZSeeker) {
    schemaPrefix = appSchemePrefix[AppFlags.ZZSeeker]
  }

  //
  const url = encodeURIComponent(urlScheme)
  const schema = `${schemaPrefix}//${jumpPath}`
  let unifiedUrl = `${schema}?url=${url}`

  // 目标是 微信小程序 直接调处理后的 urlScheme
  if (targetAppFlag & AppFlags.WXMini) {
    unifiedUrl = urlScheme
  }

  logInfo('unifiedUrl ==', unifiedUrl)
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
  //handleCheck()
}

// 加载sdk 资源
export const loadZZSkd = (sdkName: SDKNames): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    try {
      loadJSArr([dependencies[sdkName].link], () => {
        //  确认 是否需要判断 找靓机 加载单独的 js-sdk
        if (sdkName === SDKNames.ZZ_SDK) {
          logInfo('window.ZZAPP ==', window['@zz-common/zz-jssdk'].default)
          resolve(window['@zz-common/zz-jssdk'].default)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}
//  转转公司内部 app 都加载 zz-js-sdk
export const openZZInnerApp = (
  ctx: CallAppInstance,
  curAppFlag: AppFlags,
  targetAppFlag: AppFlags
) => {
  const { callError = () => {} } = ctx.options
  loadZZSkd(SDKNames.ZZ_SDK)
    .then((app) => {
      openAPP(ctx, app, curAppFlag, targetAppFlag)
    })
    .catch((_) => {
      callError()
      logError('err', _)
    })
}
