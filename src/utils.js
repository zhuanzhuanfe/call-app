// 加载 js 资源
export const loadJS = (url, cb) => {
  let head = window.document.getElementsByTagName('head')[0]
  let js = window.document.createElement('script')
  js.setAttribute('type', 'text/javascript')
  js.setAttribute('async', 'async')
  js.setAttribute('src', url)
  js.onload = cb
  head.appendChild(js)
}

export const loadJSArr = (urls, cb) => {
  let done = 0
  if (typeof urls === 'string') urls = [urls]
  const { length } = urls
  urls.map(url =>
    loadJS(url, () => {
      ++done >= length && cb()
    })
  )
}

//
export const getUrlParams = url => {
  if(typeof window === 'undefined') { return {} }
  url = url || (location && location.href)
  if (url.indexOf('?') < 0) return {}

  return url
    .replace(/^.+?\?/, '')
    .replace(/#.+/, '')
    .split('&')
    .filter(param => param)
    .map(decodeURIComponent)
    .reduce((obj, param) => {
      const i = param.indexOf('=')
      const t = [param.slice(0, i), param.slice(i + 1)]
      obj[t[0]] = t[1]
      return obj
    }, {})
}
//
export const getCookie = name =>
  (
    document.cookie
      .split('; ')
      .filter(cookie => +cookie.indexOf(name + '=') === 0)
      .pop() || ''
  ).replace(/[^=]+=/, '')

function select(element) {
  if(typeof window === 'undefined') { return {} }
  var selectedText
  if (element.nodeName === 'SELECT') {
    element.focus()
    selectedText = element.value
  } else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
    var isReadOnly = element.hasAttribute('readonly')
    if (!isReadOnly) {
      element.setAttribute('readonly', '')
    }

    element.select()
    element.setSelectionRange(0, element.value.length)

    if (!isReadOnly) {
      element.removeAttribute('readonly')
    }
    selectedText = element.value
  } else {
    if (element.hasAttribute('contenteditable')) {
      element.focus()
    }

    var selection = window.getSelection()
    var range = document.createRange()

    range.selectNodeContents(element)
    selection.removeAllRanges()
    selection.addRange(range)

    selectedText = selection.toString()
  }
  return selectedText
}
// 复制内容到剪切板
export function copy(text, options) {
  if(typeof window === 'undefined') { return {} }
  var debug,
    fakeElem,
    success = false
  options = options || {}
  debug = options.debug || false
  try {
    const isRTL = document.documentElement.getAttribute('dir') == 'rtl'
    fakeElem = document.createElement('textarea')
    // Prevent zooming on iOS
    fakeElem.style.fontSize = '12pt'
    // Reset box model
    fakeElem.style.border = '0'
    fakeElem.style.padding = '0'
    fakeElem.style.margin = '0'
    // Move element out of screen horizontally
    fakeElem.style.position = 'absolute'
    fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px'
    // Move element to the same position vertically
    let yPosition = window.pageYOffset || document.documentElement.scrollTop
    fakeElem.style.top = `${yPosition}px`
    fakeElem.setAttribute('readonly', '')
    fakeElem.value = text
    document.body.appendChild(fakeElem)

    select(fakeElem)

    var successful = document.execCommand('copy')

    console.log('successful', successful)
    if (!successful) {
      throw new Error('copy command was unsuccessful')
    }
    success = true
  } catch (err) {
    debug && console.error('unable to copy using execCommand: ', err)
    debug && console.warn('trying IE specific stuff')
    try {
      window.clipboardData.setData('text', text)
      success = true
    } catch (err) {
      debug && console.error('unable to copy using clipboardData: ', err)
    }
  } finally {
    if (fakeElem) {
      document.body.removeChild(fakeElem)
    }
  }
  return success
}

/**
 * 授权的公众号id
 * */
const getWxPublicId = () => {
  if(typeof window === 'undefined') { return {} }
  const query = getUrlParams()
  const config = Object.assign({}, window.nativeAdapterConfig)
  return (
    query.wxPublicId ||
    config.wxPublicId ||
    query.__t ||
    getCookie('zz_t') ||
    getCookie('t') ||
    '24'
  )
}

/**
 * 第三方依赖, 外链js
 * */
export const dependencies = {
  ZZ_SELLER_SDK: {
    link: 'https://s1.zhuanstatic.com/common/zzapp/static/js/v1.0.14/zzseller-jssdk.min.js',
    name: 'ZZSELLER'
  },
  ZZ_HUNTER_SDK: {
    link: 'https://s1.zhuanstatic.com/common/hunterapp/static/js/1.1.1/index.min.js',
    name: 'HUNTERAPP',
  },
  ZZ_SDK: {
    link: 'https://s1.zhuanstatic.com/common/zzapp/static/js/1.14.0/zzapp.min.js',
    name: '',
  },
  WB_SDK: {
    link: 'https://a.58cdn.com.cn/app58/rms/app/js/app_30805.js?cachevers=670',
    name: '',
  },
  WX_JWEIXIN: {
    link: 'https://s1.zhuanstatic.com/common/jweixin-1.6.0.js',
    name: '',
  },
  WX_WIKI: {
    link: 'https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115',
  },
  WX_JSTICKET: {
    link: `https://app.zhuanzhuan.com/zzopen/wxcommon/getJsTicket?wxPublicId=${getWxPublicId()}&url=` +
      encodeURIComponent(location ? location.href.split('#')[0] : '') +
      '&callback=__json_jsticket',
  },
}

/**
 * 转转App, native相关信息
 * */
export const AppInfomation = {
  SCHEMA: 'zhuanzhuan://', // 转转App跳转协议(Android & IOS)
  ANDROID_PACKAGE_NAME: 'com.wuba.zhuanzhuan', // Android客户端包名
  ANDROID_MAINCLS:
    'com.wuba.zhuanzhuan.presentation.view.activity.LaunchActivity', // Android客户端启动页主类名
}

/**
 * 转转微信公众号相关信息
 * */
export const wechatInfomation = {
  appID: 'wx6f1a8464fa672b11', //转转app在微信绑定的appid
}
