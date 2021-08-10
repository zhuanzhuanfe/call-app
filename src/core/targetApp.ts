/**
 *
 * 需要唤起的 目标app 信息处理中心
 *
 */

import { getDownloadConfig, TargetAppNames } from './download'
import { CallAppOptions, DownloadConfig } from '../index'

// 获取 目标 app 类型
export const getTargetInfo = (options: CallAppOptions) => {
  let { path, targetApp } = options
  // 从 path 解析 target-app
  if (!path) {
    console.error
      ? console.error(`options.path '${options.path}' is Invalid， please check! \n`)
      : console.log(`Error:\n options.path '${options.path}' is Invalid， please check! \n`)
    return
  }

  const { appName } = handlePath2appName(path)
  // 优先取 options.targetApp // 默认 配置为 转转
  targetApp = targetApp || appName || TargetAppNames.ZZ

  if (!targetApp) {
    console.error
      ? console.error(`options.targetApp '${options.targetApp}' is Invalid， please check! \n`)
      : console.log(
          `Error:\n options.targetApp '${options.targetApp}' is Invalid， please check! \n`
        )
    return
  }

  let name = TargetAppNames.ZZ
  let flag = 0
  let schemePrefix: string
  let downloadConfig: DownloadConfig
  let universalPath: string

  if (isZZ(targetApp)) {
    name = TargetAppNames.ZZ
  } else if (isZZSeeker(targetApp)) {
    name = TargetAppNames.ZZSeeker
  } else if (isZZHunter(targetApp)) {
    name = TargetAppNames.ZZHunter
  } else if (isZZSeller(targetApp)) {
    name = TargetAppNames.ZZSeller
  } else {
    console.error
      ? console.error(`options.targetApp '${options.targetApp}' is Invalid， please check! \n`)
      : console.log(
          `Error:\n options.targetApp '${options.targetApp}' is Invalid， please check! \n`
        )
  }

  [flag, schemePrefix, universalPath, downloadConfig] = [
    targetAppFlag[name],
    targetAppSchemePrefix[name],
    targetAppUniversalPath[name],
    getDownloadConfig(name),
  ]

  return { flag, name, schemePrefix, universalPath, downloadConfig }
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
const isZZPath = (path: string): boolean => /^zhuanzhuan:/.test(path)

const isZZSeekerPath = (path: string): boolean => /^zljgo:/i.test(path)

export const handlePath2appName = (path: string): { appName?: TargetAppNames } => {
  let appName

  if (isZZSeekerPath(path)) appName = TargetAppNames.ZZSeeker
  if (isZZPath(path)) appName = TargetAppNames.ZZ

  return { appName }
}

export const targetAppFlag = {
  [TargetAppNames.ZZ]: 1,
  [TargetAppNames.ZZSeller]: 1 << 1,
  [TargetAppNames.ZZHunter]: 1 << 2,
  [TargetAppNames.ZZSeeker]: 1 << 3,
  // [TargetAppNames.ZZInner]: 1 | (1 << 1) | (1 << 2) | (1 << 3)
}

export const targetAppSchemePrefix = {
  [TargetAppNames.ZZ]: 'zhuanzhuan:',
  [TargetAppNames.ZZSeller]: 'zhuanzhuanseller:', // 商家版app已下架, 服务停掉后考虑移除该app逻辑
  [TargetAppNames.ZZHunter]: 'zzhunter:',
  [TargetAppNames.ZZSeeker]: 'zljgo:',
}

export const targetAppUniversalPath = {
  [TargetAppNames.ZZ]: 'zhuanzhuan',
  [TargetAppNames.ZZSeller]: 'zhuanzhuanseller', // 目前不支持
  [TargetAppNames.ZZHunter]: 'zzhunter', // 目前不支持
  [TargetAppNames.ZZSeeker]: 'zljgo', // 目前不支持
}
