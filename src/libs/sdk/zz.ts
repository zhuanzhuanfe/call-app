import { TargetAppNames } from '../../core/download'
import { targetAppSchemePrefix } from '../../core/targetApp'
import { TargetInfo } from '../../index'
import { dependencies, SDKNames } from '../config'
import { loadJSArr } from '../utils'

/*

可主动唤起的场景：

｜   -   ｜ 转转  ｜ 找靓机 ｜ 卖家版  ｜ 采货侠 ｜ (这一行为 主动唤起方)
｜ 转转   ｜      ｜  ✅    ｜   ✅   ｜  ✅   ｜
｜ 找靓机 ｜  ✅   ｜       ｜        ｜       ｜
｜ 采货侠 ｜  ✅   ｜       ｜        ｜       ｜
｜ 卖家版 ｜  ✅   ｜       ｜        ｜       ｜

*/

// 打开转转app
export const openZZAPP = (
  schemeURL?: string,
  App?: Record<string, any>,
  curAPP?: TargetAppNames
): void => {
  if (schemeURL && App && curAPP) {
    const url = encodeURIComponent(schemeURL)
    const schemaPerfix = targetAppSchemePrefix[curAPP]
    const schema = `${schemaPerfix}//jump/core/openZhuanZhuan/jump`
    const unifiedUrl = `${schema}?url=${url}`
    // 通过sdk唤起
    App.enterUnifiedUrl({ unifiedUrl })
  }
}
// 打开 转转内部 app
export const openZZInnerApp = (sdkName: SDKNames, schemeURL?: string, targetInfo?: TargetInfo) => {
  loadZZInnerSkd(sdkName).then((res) => {
    let app = res
    if (targetInfo?.name === TargetAppNames.ZZHunter) {
      // 采货侠app
      openZZAPP(schemeURL, app, TargetAppNames.ZZHunter)
    }
    if (targetInfo?.name === TargetAppNames.ZZSeller) {
      // 商家版app
    }
    if (targetInfo?.name == TargetAppNames.ZZSeeker) {
      // 找靓机app
    }
  })
}

// 加载sdk 资源
export const loadZZInnerSkd = (sdkName: SDKNames): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    try {
      loadJSArr([dependencies[sdkName].link], () => {
        if (sdkName === SDKNames.ZZ_SDK || sdkName === SDKNames.ZZ_ZLJ_SDK) {
          resolve(window.ZZAPP)
        } else if (sdkName === SDKNames.ZZ_HUNTER_SDK) {
          resolve(window.HUNTERAPP)
        } else if (sdkName === SDKNames.ZZ_SELLER_SDK) {
          resolve(window.ZZSELLER)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}
