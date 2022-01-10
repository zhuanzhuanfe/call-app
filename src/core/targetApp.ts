/**
 *
 * 需要唤起的 目标app 信息处理中心
 *
 */

import { getDownloadConfig, AppNames } from './download'
import { CallAppOptions, DownloadConfig, TargetApp } from '../index'
import { logError, logInfo } from '../libs/utils'

export const enum AppFlags {
  ZZ = 1,
  ZZSeller = 1 << 1,
  ZZHunter = 1 << 2,
  ZZSeeker = 1 << 3,
  WXMini = 1 << 4,
  NoZZ = (1 << 1) | (1 << 2) | (1 << 3) | (1 << 4),
}

export const appSchemePrefix = {
  [AppFlags.ZZ]: 'zhuanzhuan:',
  [AppFlags.ZZSeller]: 'zhuanzhuanseller:',
  [AppFlags.ZZHunter]: 'zzhunter:',
  [AppFlags.ZZSeeker]: 'zljgo:',
}

export const appUniversalPath = {
  [AppFlags.ZZ]: 'zhuanzhuan',
  [AppFlags.ZZSeller]: 'seller',
  [AppFlags.ZZHunter]: 'zzhunter',
  [AppFlags.ZZSeeker]: 'zhaoliangji',
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
  // 优先取 options.targetApp
  targetApp = (targetApp || appName || AppNames[AppFlags.ZZ]) as TargetApp

  if (!targetApp) {
    logError(`(targetApp || appName) '${targetApp}' is Invalid， please check! \n`)
    return
  }

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
  } else if (isWXMini(targetApp)) {
    name = AppNames[AppFlags.WXMini]
    flag = AppFlags.WXMini

    return {
      flag,
      name,
      downloadConfig: getDownloadConfig(flag),
      schemePrefix: appSchemePrefix[AppFlags.ZZ],
      universalPath: appUniversalPath[AppFlags.ZZ],
    }
  } else {
    logError(`options.targetApp '${options.targetApp}' is Invalid， please check! \n`)
  }

  ;[schemePrefix, universalPath, downloadConfig] = [
    appSchemePrefix[flag],
    appUniversalPath[flag],
    getDownloadConfig(flag),
  ]

  return { flag, name, schemePrefix, universalPath, downloadConfig }
}

const isZZ = (targetApp: string): boolean => /^(zhuanzhuan|zz)$/i.test(targetApp)

const isZZSeller = (targetApp: string): boolean => /^zzSeller$/i.test(targetApp)

const isZZHunter = (targetApp: string): boolean => /^zzHunter$/i.test(targetApp)

const isZZSeeker = (targetApp: string): boolean => /^zlj$/i.test(targetApp)
//
const isWXMini = (targetApp: string): boolean => /^wxMini$/i.test(targetApp)
// 从 options.path 中获取 target-app
const isZZPrefixPath = (path: string): boolean => /^zhuanzhuan:/.test(path)

const isZZSeekerPrefixPath = (path: string): boolean => /^zljgo:/i.test(path)

const isZZSellerPrefixPath = (path: string): boolean => /^zhuanzhuanseller:/i.test(path)

const isZZHunterPrefixPath = (path: string): boolean => /^zzhunter:/i.test(path)

export const handlePath2appName = (path: string) => {
  let appName
  if (isZZSeekerPrefixPath(path)) appName = AppNames[AppFlags.ZZSeeker]
  if (isZZPrefixPath(path)) appName = AppNames[AppFlags.ZZ]
  if (isZZSellerPrefixPath(path)) appName = AppNames[AppFlags.ZZSeller]
  if (isZZHunterPrefixPath(path)) appName = AppNames[AppFlags.ZZHunter]

  logInfo('handlePath2appName', appName, path)
  return { appName }
}
