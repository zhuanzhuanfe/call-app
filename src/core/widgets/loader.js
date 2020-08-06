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
