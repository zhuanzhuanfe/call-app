// 加载 js 资源
export const loadJS = (url: string, cb: () => void) => {
  let head = window.document.getElementsByTagName('head')[0]
  let js = window.document.createElement('script')
  js.setAttribute('type', 'text/javascript')
  js.setAttribute('async', 'async')
  js.setAttribute('src', url)
  js.onload = cb
  head.appendChild(js)
}

export const loadJSArr = (urls: string[], cb: () => void) => {
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
export const getUrlParams = (url?: string): Record<string, string> => {
  if (typeof window === 'undefined') { return {} }
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
export const getCookie = (name: string): string =>
  (
    document.cookie
      .split('; ')
      .filter(cookie => +cookie.indexOf(name + '=') === 0)
      .pop() || ''
  ).replace(/[^=]+=/, '')

function select(element) {
  if (typeof window === 'undefined') { return {} }
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
export function copy(text: string, options?: Record<string, any>): boolean {
  if (typeof window === 'undefined') { return null }
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

// 展示遮罩层
export const showMask = (): void => {
  const mask = document.createElement('div')
  mask.style.cssText =
    'position: fixed;z-index: 100000;transition: all 0.5s;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0,0,0,0.6);opacity:0'
  mask.innerHTML =
    '<img src="https://pic3.zhuanstatic.com/zhuanzh/n_v28e90120d40634639b6f606af7ca40fb3.png" style="position:absolute;top:20px;right:20px;left:auto;bottom:auto;line-height:0;width:168px;height:81px;transform: translate3d(0, 0, 0);">'
  document.body.appendChild(mask)
  setTimeout(() => {
    mask.style.opacity = '1'
  }, 300)

  mask.addEventListener('click', function () {
    document.body.removeChild(mask)
  })
}
