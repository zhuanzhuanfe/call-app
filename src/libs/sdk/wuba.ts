import { CallAppInstance } from '../../index'
import { AppInfo, dependencies } from '../config'
import { checkOpen } from '../evoke'
import { loadJSArr, logError, logInfo } from '../utils'

export type App58 = {
  action?: {
    openApp: (...res: any[]) => void
    isInstallApp: (...res: any[]) => void
  }
  common?: {
    appVersion?: string
  }
}

export const load58SDK = (): Promise<any> =>
  new Promise((resolve) => {
    loadJSArr([dependencies.WB_SDK.link], () => {
      resolve(window.WBAPP)
    })
  })

export const sdk58 = {
  isInstallApp: (app: App58, options = {}) => {
    return new Promise((resolve, reject) => {
      app?.action?.isInstallApp(options, (_: any) => {
        _ ? resolve({}) : reject({})
      })
    })
  },
  openApp(app: App58, options = {}) {
    return app?.action?.openApp(options)
  },
  getVersion(app: App58) {
    return app?.common?.appVersion
  },
}
/**
 * 58app内打开转转
 * @param instance
 * @param appInfo
 */
export const openZZIn58 = (instance: CallAppInstance, appInfo: AppInfo) => {
  logInfo('openZZIn58')

  const {
    options: { delay = 2500, callError = () => {}, callSuccess = () => {}, callFailed = () => {} },
    urlScheme,
  } = instance

  if (!urlScheme) {
    logError(`scheme-uri is invalid`)
    return
  }

  // load sdk
  load58SDK()
    .then((app) => {
      // hack 检测 open状态
      const handleCheck = () =>
        checkOpen(
          () => {
            callFailed()
            instance.download()
          },
          callSuccess,
          callError,
          delay
        )

      // sdk
      sdk58.openApp(app, {
        urlschema: urlScheme || appInfo.SCHEMA,
        package: appInfo.ANDROID_PACKAGE_NAME,
        maincls: appInfo.ANDROID_MAINCLS,
      })

      handleCheck()
    })
    .catch((error) => {
      instance.download()
      callFailed()
      logError(error)
    })
}
