
//  获取平台类型
const ua = (navigator && navigator.userAgent) || '';

/**
 *
 * native-webview 相关
 *
 */
// 58 app
export const is58App = /wuba/i.test(ua);
// zz app
export const isZZ = /58zhuanzhuan/i.test(ua);
// zz采货侠 app
export const isZZHunter = /zzHunter/i.test(ua);
// zz卖家版 app
export const isZZSeller = /zhuanzhuanSeller/i.test(ua);
// zz找靓机 app
export const isZZSeeker = /zhuanzhuanzSeeker/i.test(ua);
// zz 内部 app
export const isZZInner = /^((58zhuanzhuan)|(zzHunter)|(zhuanzhuanseller)|(zhuanzhuanzSeeker))/i.test(ua)

export const isWechat = /micromessenger\/([\d.]+)/i.test(ua);

export const isWeibo = /(weibo).*weibo__([\d.]+)/i.test(ua);

export const isQQ = /qq\/([\d.]+)/i.test(ua);

export const isQzone = /qzone\/.*_qz_([\d.]+)/i.test(ua);

/**
 *
 * 操作系统 相关
 *
 */
export const isAndroid = /android/i.test(ua);

export const isIos = /iphone|ipad|ipod/i.test(ua);

/**
 *
 * browser 相关
 *
 */

export const isBaidu = /(baiduboxapp)\/([\d.]+)/i.test(ua);

export const isQQBrowser = /(qqbrowser)\/([\d.]+)/i.test(ua);

// 安卓 chrome 浏览器，包含 原生chrome浏览器、三星自带浏览器、360浏览器以及早期国内厂商自带浏览器
export const isOriginalChrome =
  /chrome\/[\d.]+ mobile safari\/[\d.]+/i.test(ua) && isAndroid && ua.indexOf('Version') < 0;

/**
 *
 * 版本号 相关
 *
 */

// 版本号比较
export const semverCompare = (versionA, versionB)=> {
  // eslint-disable-next-line no-restricted-properties
  const { isNaN } = window;
  const splitA = versionA.split('.');
  const splitB = versionB.split('.');

  for (let i = 0; i < 3; i++) {
    const snippetA = Number(splitA[i]);
    const snippetB = Number(splitB[i]);

    if (snippetA > snippetB) return 1;
    if (snippetB > snippetA) return -1;

    // e.g. '1.0.0-rc' -- Number('0-rc') = NaN
    if (!isNaN(snippetA) && isNaN(snippetB)) return 1;
    if (isNaN(snippetA) && !isNaN(snippetB)) return -1;
  }

  return 0;
};

//  获取 ios 大版本号
export const getIOSVersion = () => {
  const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
  return Number.parseInt(version[1], 10);
};

//  获取 微信 版本号
export const getWeChatVersion = () => {
  const version = navigator.appVersion.match(/micromessenger\/(\d+\.\d+\.\d+)/i);
  return version[1];
};

// IOS 版本号
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
