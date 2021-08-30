/**
 * 下载处理中心
 * download-config-center && generate download-url
 */
import { is58App, isAndroid, isIos, isQQ, isWechat } from '../libs/platform'
import { is58Host } from '../libs/hostname'
import { DownloadConfig, CallAppOptions, TargetInfo } from '../index'
import { logError } from '../libs/utils'
import { AppFlags } from './targetApp'

export const AppNames = {
  [AppFlags.ZZ]: 'zz',
  [AppFlags.ZZSeeker]: 'zlj',
  [AppFlags.ZZHunter]: 'zzHunter',
  [AppFlags.ZZSeller]: 'zzSeller',
}

export interface CallAppInstance {
  options: CallAppOptions
  start: () => void
  download: () => void
  targetInfo?: TargetInfo
  downloadLink?: string
  urlScheme?: string
  universalLink?: string
  intentLink?: string
}

// 目标app 各平台下载地址 配置
export const allDownloadUrls = {
  [AppFlags.ZZ]: {
    // ios 商店 下载
    // ios: 'https://apps.apple.com/app/apple-store/id1002355194?pt=118679317&ct=923&mt=8', // 这种格式链接qq内无法触发下载
    ios: 'https://itunes.apple.com/cn/app/id1002355194?pt=118679317&ct=923&mt=8',
    // 安卓 市场 下载
    android: 'market://details?id=com.wuba.zhuanzhuan',
    // 腾讯 应用宝 下载
    android_yyb: 'https://sj.qq.com/myapp/detail.htm?apkName=com.wuba.zhuanzhuan',
    // download-api 下载 / 转转特殊的处理方式 安卓ios 统一下载 会更改下载配置文件
    api: 'https://app.zhuanzhuan.com/zz/redirect/download',
  },
  // 找靓机
  [AppFlags.ZZSeeker]: {
    ios: 'https://itunes.apple.com/cn/app/id1060362098',
    android: 'market://details?id=com.huodao.hdphone',
    android_api: 'https://dlapk.zhaoliangji.com/zlj_zhaoliangji.apk',
    android_yyb: 'https://sj.qq.com/myapp/detail.htm?apkName=com.huodao.hdphone',
  },
  // 采货侠
  [AppFlags.ZZHunter]: {
    ios: 'https://itunes.apple.com/cn/app/id1491125379',
    android: 'market://details?id=com.zhuanzhuan.hunter',
    android_api:
      'https://app.zhuanzhuan.com/zzopredirect/ypofflinemart/downloadIosOrAndroid?channelId=923   ',
    android_yyb: 'https://sj.qq.com/myapp/detail.htm?apkName=com.zhuanzhuan.hunter',
  },
  // 卖家版
  [AppFlags.ZZSeller]: {
    ios: '',
    android: '',
    android_api: '',
    android_yyb: '',
  },
}

// 构造 下载链接
export const generateDownloadUrl = (instance: CallAppInstance): string => {
  // 第三方配置
  const {
    options: { customConfig },
  } = instance

  if (customConfig) {
    const { downloadConfig, landingPage } = customConfig
    if (landingPage) return landingPage || ''
    if (downloadConfig) {
      if (isIos) {
        return downloadConfig?.ios || ''
      }
      if (isWechat && isAndroid) {
        return downloadConfig?.android_yyb || ''
      }
      return downloadConfig?.android || ''
    }
    return ''
  }

  //
  const { options, targetInfo: { downloadConfig, flag } = {} } = instance
  const { channelId, middleWareUrl, download, deeplinkId } = options

  if (!download || flag === undefined) return ''

  let downloadUrl: string | undefined = ''
  // 下载配置
  // (目前 h5 环境 只考虑 zz、zlj、zzHunter)
  if (flag & AppFlags.ZZ) {
    // 目标app 是转转
    if (isWechat && is58Host) {
      // plat 如果 wx + hostname 58.com， downloadConfig[api] + '?channelId=' + channelId
      downloadUrl = `${downloadConfig?.api}?channelId=${channelId}`
    } else if ((is58App && isIos) || ((isQQ || isWechat) && isIos)) {
      // plat 如果 58 + ios || wx + ios || qq + ios, 走 苹果商店 , downloadConfig[ios]
      downloadUrl = downloadConfig?.ios || ''
    } else if ((isQQ || isWechat) && isAndroid) {
      // plat 如果 wx + android || qq + android， 走应用宝， downloadConfig[android_yyb]
      downloadUrl = downloadConfig?.android_yyb
    } else if (is58App && isAndroid) {
      // plat 如果 58App ，无法传递 channelId ， 应用商店下载 downloadUrl[ios | android]
      downloadUrl = downloadConfig?.android
    } else {
      //  其他 走 download-api 下载 channelId deeplinkId,
      // channelId 统计下载来源/渠道， deeplinkId App 后台配置默认打开页
      // wx 特殊处理 deepLinkId
      const wechat = isWechat ? '#mp.weixin.qq.com' : ''
      const deeplink = deeplinkId ? `&deeplinkId=${deeplinkId}${wechat}` : ''

      downloadUrl = `${downloadConfig?.api}?channelId=${channelId}${deeplink}`
    }
  } else if (flag & AppFlags.ZZSeeker || flag & AppFlags.ZZHunter) {
    // 目标app 是找靓机、采货侠
    if (isIos) {
      downloadUrl = downloadConfig?.ios
    } else if (isWechat && isAndroid) {
      downloadUrl = downloadConfig?.android_yyb
    } else {
      downloadUrl = downloadConfig?.android_api || downloadConfig?.android
    }
  } else {
    // 不存在 name
    logError(`generate downloadUrl error`)
  }

  return middleWareUrl || downloadUrl || ''
}

// 根据目标app 获取下载链接 配置
export const getDownloadConfig = (name: AppFlags): DownloadConfig => {
  // 根据需要唤起的 目标 app ，获取 downloadUrl
  return allDownloadUrls[name]
}
