type Hidden = 'hidden' | 'msHidden' | 'webkitHidden' | undefined
type VisibilityChange = 'visibilitychange' | 'msvisibilitychange' | 'webkitvisibilitychange' | undefined

let hidden: Hidden;
let visibilityChange: VisibilityChange;
let iframe: HTMLIFrameElement;

function getSupportedProperty() {
  if (typeof document === 'undefined') return;

  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }
}

getSupportedProperty();

/**
 * 判断页面是否隐藏（进入后台）
 */
function isPageHidden() {
  if (typeof hidden === 'undefined') return false;
  return document[hidden];
}

/**
 * 通过 top.location.href 跳转
 * @param {string}} [uri] - 需要打开的地址
 */
export function evokeByLocation(uri: string) {
  window.top.location.href = uri;
}

/**
 * 通过 A 标签唤起
 * @param {string} uri - 需要打开的地址
 */
export function evokeByTagA(uri: string) {
  const tagA = document.createElement('a');

  tagA.setAttribute('href', uri);
  tagA.style.display = 'none';
  document.body.append(tagA);

  tagA.click();
}

/**
 * 通过 iframe 唤起
 * @param {string} [uri] - 需要打开的地址
 */
export function evokeByIFrame(uri: string) {
  if (!iframe) {
    iframe = document.createElement('iframe');
    iframe.style.cssText = 'display:none;border:0;width:0;height:0;';
    document.body.append(iframe);
  }

  iframe.src = uri;
}

/**
 * 检测是否唤端成功
 * @param failure - 唤端失败回调函数
 * @param success - 唤端成功回调函数
 * @param timeout
 */
export function checkOpen(failure: () => void, success: () => void,  timeout: number) {
  let hasFailed = false

  let timer = setTimeout(() => {
    const pageHidden = isPageHidden();
    if (!pageHidden) {
      hasFailed = true
      failure();
    }
  }, timeout)

  let t = setTimeout(() => {
    if(!hasFailed) success()
  }, timeout + 100)

  if (typeof visibilityChange !== 'undefined') {
    document.addEventListener(visibilityChange, () => {
      clearTimeout(timer)
      timer = null
      success()
      clearTimeout(t)
    });
  } else {
    window.addEventListener('pagehide', () => {
      clearTimeout(timer)
      timer = null
      success()
      clearTimeout(t)
    });
  }
}
