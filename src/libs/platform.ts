
//  获取平台类型
const ua: string = (navigator && navigator.userAgent) || '';
console.log('ua', ua)
/**
 *
 * native-webview 相关
 *
 */
// 58 app
export const is58App: boolean = /wuba/i.test(ua);
// zz app
export const isZZ: boolean = /58zhuanzhuan/i.test(ua);
// zz采货侠 app
export const isZZHunter: boolean = /zzHunter/i.test(ua);
// zz卖家版 app
export const isZZSeller: boolean = /zhuanzhuanSeller/i.test(ua);
// zz找靓机 app
export const isZZSeeker: boolean = /zljgo/i.test(ua);
// zz 内部 app
export const isZZInner: boolean = /^((58zhuanzhuan)|(zzHunter)|(zhuanzhuanseller)|(zhuanzhuanSeeker))/i.test(ua)

export const isWechat: boolean = /micromessenger\/([\d.]+)/i.test(ua);

export const isWeibo: boolean = /(weibo).*weibo__([\d.]+)/i.test(ua);

export const isQQ: boolean = /qq\/([\d.]+)/i.test(ua);

export const isQzone: boolean = /qzone\/.*_qz_([\d.]+)/i.test(ua);

export const isUC: boolean = /ucBrowser\//i.test(ua);

export const isQuark: boolean = /quark\//i.test(ua);

export const isHuaWei: boolean = /huaweiBrowser\//i.test(ua);

/**
 *
 * 操作系统 相关
 *
 */
export const isAndroid: boolean = /android/i.test(ua);

export const isIos: boolean = /iphone|ipad|ipod/i.test(ua);

/**
 *
 * browser 相关
 *
 */

export const isBaidu: boolean = /(baiduboxapp)\/([\d.]+)/i.test(ua);

export const isQQBrowser: boolean = /(qqbrowser)\/([\d.]+)/i.test(ua);

// 安卓 chrome 浏览器，包含 原生chrome浏览器、三星自带浏览器、360浏览器以及早期国内厂商自带浏览器
export const isOriginalChrome: boolean =
  /chrome\/[\d.]+ mobile safari\/[\d.]+/i.test(ua) && isAndroid && ua.indexOf('Version') < 0;

/**
 *
 * 版本号 相关
 *
 */

// 版本号比较
export const semverCompare = (versionA: string, versionB: string): number => {
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
export const getIOSVersion = (): number => {
  const version = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
  return Number.parseInt(version[1], 10);
};

//  获取 微信 版本号
export const getWeChatVersion = ():string => {
  const version = navigator.appVersion.match(/micromessenger\/(\d+\.\d+\.\d+)/i);
  return version[1];
};

// IOS 版本号
export const IOSVersion = (): string => {
  let str = navigator.userAgent.toLowerCase()
  let ver: string | null;
  try {
    let m = str.match(/cpu iphone os (.*?) like mac os/)
    if (m) ver = m[1].replace(/_/g, '.')
  } catch (error) {
    ver = null
    console.log('IOSVersion', error)
  }
  return ver
}
