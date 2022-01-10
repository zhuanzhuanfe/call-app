/**
 * uri 生成 处理中心
 * generate uri center (include generate url-scheme && generate universal-link && generate Intent uri)
 */
import { AppFlags, handlePath2appName } from './targetApp'
import { CallAppInstance } from '../index'
import { logError } from '../libs/utils'
import { genWXminiJumpPath } from '../libs/sdk'

export interface Intent {
  package: string
  scheme: string
  action?: string
  category?: string
  component?: string
}

// 生成 scheme 链接
export const generateScheme = (instance: CallAppInstance): string => {
  // 生成  path || urlSearch || targetApp
  const { options, targetInfo } = instance
  let { path, urlSearch } = options

  path = path || urlSearch || ''
  // new Regexp(zzInnerSchemeReg).test(path)
  // 检验 path 中是否有 scheme-prefix  // 旧版本逻辑迁移

  // todo: 兼容逻辑, path 中是否 [https?://] - prefix, 唤起对应目标app的path页面
  // 需要根据各app统跳协议规范 帮业务拼接好 scheme-uri
  const { appName } = handlePath2appName(path)

  let uri = appName ? path : `${targetInfo?.schemePrefix}//${path}`

  if (targetInfo && targetInfo.flag & AppFlags.WXMini) {
    uri = appName ? path : genWXminiJumpPath(path)
  }

  return uri
}

// universal-link-host
const universalLinkHost = ''

// 生成 universalLink 链接
export const generateUniversalLink = (instance: CallAppInstance) => {
  const {
    targetInfo,
    options: { universal, channelId },
    urlScheme = '',
  } = instance

  if (!universal) return ''

  const host = universalLinkHost
  const path = targetInfo?.universalPath
  const channel = channelId ? `&channelId=${channelId}` : ''

  let app = '&app=zz'
  if (targetInfo) {
    if (targetInfo.flag & AppFlags.ZZSeeker) {
      app = '&app=zlj'
    } else if (targetInfo.flag & AppFlags.ZZHunter) {
      app = '&app=hunter'
    }
  }

  const universalLink = `https://${host}/${path}/index.html?path=${encodeURIComponent(
    urlScheme
  )}${channel}${app}`

  return universalLink
}

// 生成 appLinks Intent 链接 // 目前客户端app 都还不支持该协议
export const generateIntent = (instance: CallAppInstance): string => {
  const { options, downloadLink } = instance
  const { intent, intentParams } = options

  if (intent && !intentParams) {
    logError(`options.intentParams is not found, please check`)
    return ''
  }

  if (!intent || !intentParams) return ''

  const keys = Object.keys(intentParams) as Array<keyof Intent>
  const intentParam = keys.map((key) => `${key}=${intentParams[key]};`).join('')

  const intentTail = `#Intent;${intentParam}S.browser_fallback_url=${encodeURIComponent(
    downloadLink || ''
  )};end;`

  let urlPath = generateScheme(instance)

  urlPath = urlPath.slice(urlPath.indexOf('//') + 2)

  return `intent://${urlPath}${intentTail}`
}
