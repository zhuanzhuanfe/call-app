/**
 *
 * 需要唤起的 目标app 信息处理中心
 *
 */

import { getDownloadConfig } from './download'
import { TargetAppNames, CallAppOptions, downloadConfig } from '../types'

// 获取 目标 app 类型
export const getTargetInfo = (options: CallAppOptions) => {
  let { path, targetApp } = options
  // 从 path 解析 target-app
  let { app } = handlePath2app(path)
  // 优先取 options.targetApp // 默认 配置为 转转
  targetApp = targetApp || app || TargetAppNames.ZZ

  let name = ''
  let flag = 0,
    schemePrefix: string,
    downloadConfig: downloadConfig,
    universalPath: string;

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
const isZZ = (targetApp: string): boolean => /^(zhuanzhuan|zz)$/i.test(targetApp)
//  转转卖家版 app
const isZZSeller = (targetApp: string): boolean => /^zzSeller$/i.test(targetApp)
//  转转采货侠 app
const isZZHunter = (targetApp: string): boolean => /^zzHunter$/i.test(targetApp)
//  转转找靓机 app
const isZZSeeker = (targetApp: string): boolean => /^zzSeeker$/i.test(targetApp)

// 从 options.path 中获取 target-app
const isZZPath = (path:string) :boolean => /^zhuanzhuan:/.test(path)
const isZZSeekerPath = (path:string) :boolean => /^zljgo:/i.test(path)
export const handlePath2app = (path: string): Record<string, any> => {
  let app = ''

  if(isZZSeekerPath(path)) app = TargetAppNames.ZZSeeker
  if(isZZPath(path)) app = TargetAppNames.ZZ

  return { app }
}


export const targetAppFlag = {
  [TargetAppNames.ZZ]: 1,
  [TargetAppNames.ZZSeller]: 1 << 1,
  [TargetAppNames.ZZHunter]: 1 << 2,
  [TargetAppNames.ZZSeeker]: 1 << 3,
  [TargetAppNames.ZZInner]: 1 | (1 << 1) | (1 << 2) | (1 << 3)
}

export const targetAppSchemePrefix = {
  [TargetAppNames.ZZ]: 'zhuanzhuan:',
  [TargetAppNames.ZZSeller]: 'zhuanzhuanseller:', // 目前不支持
  [TargetAppNames.ZZHunter]: 'zhuanzhuanHunter:', // 目前不支持
  [TargetAppNames.ZZSeeker]: 'zljgo:',
}

export const targetAppUniversalPath = {
  [TargetAppNames.ZZ]: 'zhuanzhuan',
  [TargetAppNames.ZZSeller]: 'zhuanzhuanseller', // 目前不支持
  [TargetAppNames.ZZHunter]: 'zhuanzhuanHunter', // 目前不支持
  [TargetAppNames.ZZSeeker]: 'zljgo',
}
