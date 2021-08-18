import { AppFlags, appSchemePrefix } from '../../core/targetApp'
import { CallAppInstance } from '../../index'
import { dependencies, SDKNames } from '../config'
import { checkOpen } from '../evoke'
import { loadJSArr, logError, logInfo } from '../utils'

// logInfo('enum SDKNames', SDKNames)
/*

可主动唤起的场景(需求)：

｜   -   ｜ 转转  ｜ 找靓机 ｜ 采货侠  ｜ 卖家版 ｜ (这一行代表 主动唤起方)
｜ 转转   ｜      ｜  -    ｜   ✅   ｜  ✅   ｜
｜ 找靓机 ｜  -    ｜       ｜        ｜       ｜
｜ 采货侠 ｜  ✅   ｜       ｜        ｜       ｜
｜ 卖家版 ｜  ✅   ｜       ｜        ｜       ｜

*/

// 打开 转转内部 app
// zz  zzSeller zzHunter 都走 zz-js-sdk + 统跳地址
// 统跳地址平台： https://jump.zhuanspirit.com/#/zhuanzhuan?page=1&search=open

const openZZJumpPath = `jump/core/openZhuanZhuan/jump`
const openZZHunterJumpPath = `jump/core/openHunter/jump`
const openZZSellerJumpPath = `jump/core/openZhuanZhuanSeller/jump`
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
    return logError('openZZLikeAPP failed, please check options.path or options.targetApp is legal')

  const {
    callFailed = () => {},
    callSuccess = () => {},
    callError = () => {},
    delay = 2500,
  } = ctx.options

  // hack 检测 open状态
  const handleCheck = () =>
    checkOpen(
      () => {
        callFailed()
        download.call(ctx)
      },
      () => {
        callSuccess()
      },
      () => {
        callError()
      },
      delay
    )

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

  logInfo('unifiedUrl', unifiedUrl)
  logInfo('app.enterUnifiedUrl', app.enterUnifiedUrl)
  // 通过sdk唤起 , 失败成功 回调
  app.enterUnifiedUrl({ unifiedUrl }, (res1: any, res2: any) => {
    // 需要确认 native端回调函数 支持情况

    logInfo('app.enterUnifiedUrl callback', res1, res2)
  })
  //
  handleCheck()
}

// 加载sdk 资源
export const loadZZSkd = (sdkName: SDKNames): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    try {
      loadJSArr([dependencies[sdkName].link], () => {
        //  确认 是否需要判断 找靓机 加载单独的 js-sdk
        if (sdkName === SDKNames.ZZ_SDK) {
          logInfo('window.ZZAPP', window.ZZAPP)
          resolve(window.ZZAPP)
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
      logError(_)
    })
}
