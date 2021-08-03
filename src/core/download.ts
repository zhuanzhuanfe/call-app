/**
 * 下载处理中心
 * download-config-center && generate download-url
 */
import {
  is58App,
  isAndroid,
  isIos,
  isQQ,
  isWechat,
} from '../libs/platform'
import { is58Host } from '../libs/hostname'
import { CallAppInstance, downloadConfig, TargetAppNames } from '../types'
// 目标app 各平台下载地址 配置
export const allDownloadUrl = {
  [TargetAppNames.ZZ]: {
    // ios 商店 下载
    // ios: 'https://apps.apple.com/app/apple-store/id1002355194?pt=118679317&ct=923&mt=8', // 这种格式链接qq内无法触发下载
    ios: 'https://itunes.apple.com/cn/app/id1002355194?pt=118679317&ct=923&mt=8',
    // 安卓 市场 下载
    android: 'market://details?id=com.wuba.zhuanzhuan',
    // 腾讯 应用宝 下载
    android_yyb: 'https://sj.qq.com/myapp/detail.htm?apkName=com.wuba.zhuanzhuan',
    // download-api 下载
    api: 'https://app.zhuanzhuan.com/zz/redirect/download',
  },
  // 找靓机
  [TargetAppNames.ZZSeeker]: {
    ios: 'https://itunes.apple.com/cn/app/id1060362098',
    android: 'market://details?id=com.huodao.hdphone',
    android_api: 'https://dlapk.zhaoliangji.com/zlj_zhaoliangji.apk',
    android_yyb: 'https://sj.qq.com/myapp/detail.htm?apkName=com.huodao.hdphone',
    api: ''
  },
  // 采货侠
  [TargetAppNames.ZZHunter]: {},
  // 卖家版
  [TargetAppNames.ZZSeller]: {},
}

// 构造 下载链接
export const generateDownloadUrl = (instance: CallAppInstance) => {
  // 第三方配置
  const { options: { customConfig } } = instance

  if(customConfig) {
    const { downloadConfig, landingPage } = customConfig
    if(landingPage) return landingPage
    if(downloadConfig) {
      if(isIos) {
        return downloadConfig.ios
      } else if(isWechat && isAndroid)  {
        return downloadConfig.android_yyb
      } else {
        return downloadConfig.android
      }
    }
    return ''
  }

  //
  const { options, targetInfo: { downloadConfig, name } } = instance
  const {
    channelId,
    middleWareUrl,
    download,
    deeplinkId
  } = options

  if (!download) return

  let downloadUrl: string
  // 下载配置
  if (name == TargetAppNames.ZZ) {
    // 目标app 是转转
    if (isWechat && is58Host) {
      // plat 如果 wx + hostname 58.com， downloadConfig[api] + '?channelId=' + channelId
      downloadUrl = downloadConfig.api + '?channelId=' + channelId
    }  else if ((is58App && isIos) || ((isQQ || isWechat) && isIos)) {
      // plat 如果 58 + ios || wx + ios || qq + ios, 走 苹果商店 , downloadConfig[ios]
      downloadUrl = downloadConfig.ios
    } else if ((isQQ || isWechat) && isAndroid) {
      // plat 如果 wx + android || qq + android， 走应用宝， downloadConfig[android_yyb]
      downloadUrl = downloadConfig.android_yyb
    } else if (is58App && isAndroid) {
      // plat 如果 58App ，无法传递 channelId ， 应用商店下载 downloadUrl[ios | android]
      downloadUrl = downloadConfig.android
    } else {
      //  其他 走 download-api 下载 channelId deeplinkId,
      // channelId 统计下载来源/渠道， deeplinkId App 后台配置默认打开页
      // wx 特殊处理 deepLinkId
      let wechat = isWechat ? '#mp.weixin.qq.com' : '';
      let deeplink = deeplinkId ? `&deeplinkId=${deeplinkId}${wechat}` : ''

      downloadUrl = downloadConfig.api + '?channelId=' + channelId + deeplink
    }
  } else if(name == TargetAppNames.ZZSeeker || name) {
    // 目标app 是找靓机
    if(isIos) {
      downloadUrl = downloadConfig.ios
    } else if(isWechat && isAndroid)  {
      downloadUrl = downloadConfig.android_yyb
    } else {
      downloadUrl = downloadConfig.android_api || downloadConfig.android
    }
  } else {
    // 不存在 name
    console.error ?
      console.error('generate downloadUrl error') :
      console.log('Error: \n generate downloadUrl error')
  }

  return middleWareUrl || downloadUrl
}

// 根据目标app 获取下载链接 配置
export const getDownloadConfig = (targetAPPName: string): downloadConfig => {
  // 根据需要唤起的 目标 app ，获取 downloadUrl
  return allDownloadUrl[targetAPPName] || {}
}
