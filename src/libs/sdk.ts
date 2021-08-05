

import { App58, CallAppInstance } from '../../types';
import { AppInfo, dependencies } from './config'
import { checkOpen, evokeByLocation } from './evoke';
import { isAndroid, semverCompare } from './platform';
import { loadJSArr } from './utils';

export const load58SDK = () =>
  new Promise((resolve) => {
    loadJSArr([dependencies.WB_SDK.link], () => {
      resolve(window.WBAPP)
    })
  })
/**
 * 58app内打开转转
 * @param schemeUrl
 * @param app
 * @param appInfo
 */
export const openZZIn58 = async (
  instance: CallAppInstance,
  appInfo: AppInfo) => {

  console.log('openZZIn58')

  try {
    const {
      universalLink,
      options: {
        universal = false,
        delay = 2500,
        callError = () => {},
        callSuccess = () => {},
        callFailed = () => {}
      },
      urlScheme
    } = instance

    if (!urlScheme) {
      console.error ?
        console.error(`schemeUrl is invalid`) :
        console.log(`Error: \n schemeUrl is invalid`);
      return
    }
    // load sdk
    const app: any = await load58SDK()

    // launch
    let isThan813 = false
    const version = sdk58.getVersion(app)
    if (version) { isThan813 = semverCompare(version, '8.13.0') >= 0 }

    console.log('isThan8.13.0', isThan813)
    console.log('isAndroid', isAndroid)

    console.log(urlScheme, universalLink, version)
    // return
    // 由于plist白名单问题, 这里做兼容, anroid端都可以支持统跳,
    // ios端8.13.0+(包括v8.13.0)才支持统跳,
    // ios端8.13.0以下只能通过sdk拉起
    let handleCheck = () =>
      checkOpen(
        () => {
          callFailed()
          instance.download()
        }, () => {
          callSuccess()
        }, () => {
          callError()
        },
        delay || 2500
      );

    if (isAndroid) {
      handleCheck()
      evokeByLocation(urlScheme)
      return
    }

    if (isThan813) {
      handleCheck()
      if(universal && universalLink) return evokeByLocation(universalLink)
      if(!universal) return evokeByLocation(urlScheme)
    }

    // sdk
    sdk58.openApp(app, {
      urlschema: urlScheme || appInfo.SCHEMA,
      package: appInfo.ANDROID_PACKAGE_NAME,
      maincls: appInfo.ANDROID_MAINCLS,
    })

    handleCheck()

  } catch (error) {
    instance.download()
    console.error(error)
  }
}

export const sdk58 = {
  isInstallApp(app: App58, options = {}) {
    return new Promise((resolve, reject) => {
      app?.action?.isInstallApp(
        options,
        (_: any) => {
          _ ? resolve({}) : reject({})
        }
      )
    })
  },
  openApp(app: App58 , options = {}) {
    return app?.action?.openApp(options)
  },
  getVersion(app: App58) {
    return app?.common?.appVersion
  }
}
