/**
 *
 * 需要唤起的 目标app 类型
 *
 */
import { getDownloadConfig } from './download'

// 获取 目标 app 类型
export const getTargetInfo = (options) => {
  const { targetApp } = options
  let flag = 1
  let name = 'zz'
  let schemePrefix, downloadConfig, universalPath;

  if(isZZ(targetApp)) {
    name = 'zz'
  } else if(isZZSeller(options)) {
    name = 'zzSeller'
  } else if(isZZHunter(options)) {
    name = 'zzHunter'
  } else if(isZZSeeker(options)) {
    name = 'zzSeeker'
  } else {
    console.error ?
      console.error(`options.targetApp '${options.targetApp}' is Invalid， please check! \n`) :
      console.log(`Error:\n options.targetApp '${options.targetApp}' is Invalid， please check! \n`);
  }

  ;[flag, schemePrefix, universalPath, downloadConfig] = [
    targetAppFlag[name],
    targetAppSchemePrefix[name],
    targetAppUniversalPath[name],
    getDownloadConfig(name),
  ];

  return { flag, name, schemePrefix, universalPath, downloadConfig };
}

//  转转 app
const isZZ = (targetApp) => /^(zhuanzhuan|zz|)$/i.test(targetApp)
//  转转卖家版 app
const isZZSeller = (targetApp) => /^zzSeller$/i.test(targetApp)
//  转转采货侠 app
const isZZHunter = (targetApp) => /^zzHunter$/i.test(targetApp)
//  转转找靓机 app
const isZZSeeker = (targetApp) => /^zzSeeker$/i.test(targetApp)

export const targetAppFlag = {
  'zz': 1,
  'zzSeller': 1 << 1,
  'zzHunter': 1 << 2,
  'zzSeeker': 1 << 3,
  'zzInner': 1 || (1 << 1) | (1 << 2) | (1 << 3)
}

export const targetAppSchemePrefix = {
  'zz': 'zhuanzhuan:',
  'zzSeller': 'zhuanzhuanseller:',
  'zzHunter': '',
  'zzSeeker': '',
}

export const targetAppUniversalPath = {
  'zz': 'zhuanzhuan',
  'zzSeller': 'zhuanzhuanseller',
  'zzHunter': '',
  'zzSeeker': '',
}
