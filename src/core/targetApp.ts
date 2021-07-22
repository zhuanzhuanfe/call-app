/**
 *
 * 需要唤起的 目标app 类型
 *
 */
import { getDownloadConfig } from './download'
import { TargetAppNames, CallAppOptions } from '../types'
// 获取 目标 app 类型
export const getTargetInfo = (options: CallAppOptions) => {
  const { targetApp } = options
  let name = TargetAppNames.ZZ
  let flag = 1,
  schemePrefix, downloadConfig, universalPath;

  if(isZZ(targetApp)) {
    name = TargetAppNames.ZZ
  } else if(isZZSeller(targetApp)) {
    name =  TargetAppNames.ZZSeller
  } else if(isZZHunter(targetApp)) {
    name = TargetAppNames.ZZHunter
  } else if(isZZSeeker(targetApp)) {
    name = TargetAppNames.ZZSeeker
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
const isZZ = (targetApp: string): boolean => /^(zhuanzhuan|zz|)$/i.test(targetApp)
//  转转卖家版 app
const isZZSeller = (targetApp: string): boolean => /^zzSeller$/i.test(targetApp)
//  转转采货侠 app
const isZZHunter = (targetApp: string): boolean => /^zzHunter$/i.test(targetApp)
//  转转找靓机 app
const isZZSeeker = (targetApp: string): boolean => /^zzSeeker$/i.test(targetApp)

export const targetAppFlag = {
  [TargetAppNames.ZZ]: 1,
  [TargetAppNames.ZZSeller]: 1 << 1,
  [TargetAppNames.ZZHunter]: 1 << 2,
  [TargetAppNames.ZZSeeker]: 1 << 3,
  [TargetAppNames.ZZInner]: 1 || (1 << 1) | (1 << 2) | (1 << 3)
}

export const targetAppSchemePrefix = {
  [TargetAppNames.ZZ]: 'zhuanzhuan:',
  [TargetAppNames.ZZSeller]: 'zhuanzhuanseller:',
  [TargetAppNames.ZZHunter]: 'zhuanzhuanHunter:',
  [TargetAppNames.ZZSeeker]: 'zhuanzhuanSeeker',
}

export const targetAppUniversalPath = {
  [TargetAppNames.ZZ]: 'zhuanzhuan',
  [TargetAppNames.ZZSeller]: 'zhuanzhuanseller',
  [TargetAppNames.ZZHunter]: '',
  [TargetAppNames.ZZSeeker]: '',
}
