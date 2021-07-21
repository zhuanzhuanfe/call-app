/**
 * scheme 构造相关
 */
import { targetAppSchemePrefix } from './targetApp'

const zzSchemePrefix = targetAppSchemePrefix['zz']

const zzInnerSchemeReg = Object.values(targetAppSchemePrefix)
  .reduce((acc, cur, i, m) => {
    const ll = m.length-1
    return `${acc}(${cur})${i >= ll ? '' : '|'}${i >= ll ? ')' : '' }`
  }, '^(');

const universalLinkHost = 'mjump.zhuanzhuan.com'

const buildScheme = (instance) => {
  // 生成  path || urlSearch || targetApp
  const { options, targetInfo } = instance
  let { path, urlSearch } = options

  path = path || getSchemeByUrlSearch(urlSearch || {})

  const schemeReg = new RegExp(zzInnerSchemeReg, '')
  let _path = schemeReg.test(path) && path;
  _path = _path || `${targetInfo.schemePrefix || zzSchemePrefix}//${path}`

  return _path
}

// 生成 scheme 链接
export const generateScheme = (instance) => {
  const uri = buildScheme(instance)

  return uri
}

// 生成 universalLink 链接
export const generateUniversalLink = (instance) => {
  const { targetInfo, options } = instance
  const { channelId } = options
  const host = universalLinkHost
  const path = targetInfo.universalPath
  const scheme = generateScheme(instance)

  const universalLink = `https://${host}/${path}/index.html?path=${encodeURIComponent(scheme)}&channelId=${channelId}`

  return universalLink
}

// 生成 appLinks 链接
export const generateIntent = (instance) => {

  return instance
}


// 兼容旧版本
/**
 * 适配传统的吊起方式, 客户端后期将不会兼容openType的方式, 统一通过'zhuanzhuan://'的统跳形式拉起
 * (ps: 特殊客户端类似58App, 会采用schema和sdk结合的方式拉起App)
 *
 * 以前的入参:
 * 一个参数 { openType } :
 *      首页: { openType: 'home' }
 *      消息tab页: { openType: 'messagecenter' }
 *      我买到的: { openType: 'mybuy' }
 *      发布页: { openType: 'publish' }
 * 两个参数 { openType, id } :
 *      详情页: { openType: 'detail', id: 'infoId' }
 *      我卖出的: { openType: 'mysell', id: '' }
 *      订单详情页: { openType: 'order', id: 'orderId' }
 *      个人主页: { openType: 'person', id: 'userId' }
 *      小区页: { openType: 'village', id: 'villageId' }
 *      M页: { openType: 'web', id: 'url' }
 */

/**
 * 跳转协议映射, 老的openType对应统跳的映射表
 * */
export const SchemaMap = {
  home: {
    name: 'home',
    path: 'zhuanzhuan://jump/core/mainPage/jump?tabId=0',
    params: {},
  },
  messagecenter: {
    name: 'messagecenter',
    path: 'zhuanzhuan://jump/core/mainPage/jump?tabId=2',
    params: {},
  },
  mybuy: {
    name: 'mybuy',
    path: 'zhuanzhuan://jump/core/myBuyList/jump?tab=price',
    params: {},
  },
  publish: {
    name: 'publish',
    path: 'zhuanzhuan://jump/core/publish/jump',
    params: {},
  },
  detail: {
    name: 'detail',
    path: 'zhuanzhuan://jump/core/infoDetail/jump',
    params: {
      id: 'infoId',
    },
  },
  mysell: {
    name: 'mysell',
    path: 'zhuanzhuan://jump/core/mySellList/jump?tab=price',
    params: {},
  },
  order: {
    name: 'order',
    path: 'huanzhuan://jump/core/orderDetail/jump',
    params: {
      id: 'orderId',
    },
  },
  person: {
    name: 'person',
    path: 'zhuanzhuan://jump/core/personHome/jump',
    params: {
      id: 'uid',
    },
  },
  village: {
    name: 'village',
    path: 'zhuanzhuan://jump/core/village/jump',
    params: {
      id: 'villageId',
    },
  },
  web: {
    name: 'web',
    path: 'zhuanzhuan://jump/core/web/jump',
    params: {
      id: 'url',
    },
  },
}

const getSchemeByUrlSearch = ({ openType = '', id = '' }) => {
  if (!openType) {
    return SchemaMap.home.path
  }
  const queryStr =
    (id &&
      (!/\?/g.test(SchemaMap[openType].path) && '?') +
        `${SchemaMap[openType].params.id}=${encodeURIComponent(id)}`) ||
    ''
  return `${SchemaMap[openType].path}${queryStr}`
}
