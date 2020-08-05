/**
 * @description 判断验证字符串是否匹配正则
 * @param {Object} options - 必填项，以json形式传参
 * @param {Reg} options.reg - 必填项，正则表达式
 * @param {String} options.str - 必填项，被匹配的字符串
 * */
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
  url = url || window.location.href
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
