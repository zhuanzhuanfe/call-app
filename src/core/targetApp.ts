/**
 *
 * 需要唤起的 目标app 信息处理中心
 *
 */

import { getDownloadConfig, AppNames } from './download'
import { CallAppOptions, DownloadConfig } from '../index'
import { logError, logInfo } from '../libs/utils'

export const enum AppFlags {
  ZZ = 1,
  ZZSeller = 1 << 1,
  ZZHunter = 1 << 2,
  ZZSeeker = 1 << 3,
}

export const appSchemePrefix = {
  [AppFlags.ZZ]: 'zhuanzhuan:',
  [AppFlags.ZZSeller]: 'zhuanzhuanseller:', // 商家版app已下架, 服务停掉后考虑移除该app逻辑
  [AppFlags.ZZHunter]: 'zzhunter:',
  [AppFlags.ZZSeeker]: 'zljgo:',
}

export const appUniversalPath = {
  [AppFlags.ZZ]: 'zhuanzhuan',
  [AppFlags.ZZSeller]: 'seller', // 目前不支持
  [AppFlags.ZZHunter]: 'zzhunter', // 目前不支持
  [AppFlags.ZZSeeker]: 'zljgo', // 目前不支持
}

// 获取 目标 app 类型
export const getTargetInfo = (options: CallAppOptions) => {
  let { path, targetApp } = options
  // 从 path 解析 target-app
  if (!path && !targetApp) {
    logError(
      `options.path '${options.path}' or options.targetApp '${options.targetApp}' is Invalid， please check! \n`
    )
    return
  }

  const { appName } = handlePath2appName(path || '')
  // 优先取 options.targetApp // 默认 配置为 转转
  targetApp = targetApp || appName || AppNames[AppFlags.ZZ]

  if (!targetApp) {
    logError(`options.targetApp '${options.targetApp}' is Invalid， please check! \n`)
    return
  }
  // 默认是 转转
  let name = AppNames[AppFlags.ZZ]
  let flag = AppFlags.ZZ
  let schemePrefix: string
  let downloadConfig: DownloadConfig
  let universalPath: string

  if (isZZ(targetApp)) {
    name = AppNames[AppFlags.ZZ]
    flag = AppFlags.ZZ
  } else if (isZZSeeker(targetApp)) {
    name = AppNames[AppFlags.ZZSeeker]
    flag = AppFlags.ZZSeeker
  } else if (isZZHunter(targetApp)) {
    name = AppNames[AppFlags.ZZHunter]
    flag = AppFlags.ZZHunter
  } else if (isZZSeller(targetApp)) {
    name = AppNames[AppFlags.ZZSeller]
    flag = AppFlags.ZZSeller
  } else {
    logError(`options.targetApp '${options.targetApp}' is Invalid， please check! \n`)
  }

  [schemePrefix, universalPath, downloadConfig] = [
    appSchemePrefix[flag],
    appUniversalPath[flag],
    getDownloadConfig(flag),
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
const isZZSeeker = (targetApp: string): boolean => /^zlj$/i.test(targetApp)

// 从 options.path 中获取 target-app
const isZZPath = (path: string): boolean => /^zhuanzhuan:/.test(path)

const isZZSeekerPath = (path: string): boolean => /^zljgo:/i.test(path)

const isZZSellerPath = (path: string): boolean => /^zhuanzhuanseller:/i.test(path)

const isZZHunterPath = (path: string): boolean => /^zzhunter:/i.test(path)

export const handlePath2appName = (path: string) => {
  let appName
  path = path && decodeURIComponent(path)
  if (isZZSeekerPath(path)) appName = AppNames[AppFlags.ZZSeeker]
  if (isZZPath(path)) appName = AppNames[AppFlags.ZZ]
  if (isZZSellerPath(path)) appName = AppNames[AppFlags.ZZSeller]
  if (isZZHunterPath(path)) appName = AppNames[AppFlags.ZZHunter]

  logInfo('handlePath2appName', appName, path)
  return { appName }
}
