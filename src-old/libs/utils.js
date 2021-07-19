/**
 * @description 判断验证字符串是否匹配正则
 * @param {Object} options - 必填项，以json形式传参
 * @param {Reg} options.reg - 必填项，正则表达式
 * @param {String} options.str - 必填项，被匹配的字符串
 * */

let document, location, navigator;
if (typeof window !== 'undefined') {
  document = window.document;
  navigator = window.navigator;
  location = window.location;
}

export const regTest = ({ reg, str }) => {
  return reg.test(str)
}

export const IOSVersion = () => {
  let str = navigator.userAgent.toLowerCase()
  let ver = str.match(/cpu iphone os (.*?) like mac os/)
  try {
    if (ver) ver = ver[1].replace(/_/g, '.')
  } catch (error) {
    console.log(error)
  }
  return ver
}

export const compareVersion = (curV, reqV) => {
  if (curV && reqV) {
    let arr1 = curV.split('.'),
      arr2 = reqV.split('.')
    let minLength = Math.min(arr1.length, arr2.length),
      position = 0,
      diff = 0
    while (
      position < minLength &&
      (diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0
    ) {
      position++
    }
    diff = diff != 0 ? diff : arr1.length - arr2.length
    return diff > 0
  } else {
    return false
  }
}

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
