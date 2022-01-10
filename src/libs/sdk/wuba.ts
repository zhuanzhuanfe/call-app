import { CallAppInstance } from '../../index'
import { AppInfo, dependencies } from '../config'
import { checkOpen } from '../evoke'
import { loadJSArr, logError, logInfo } from '../utils'

export type App5 = {
  action?: {
    openApp: (...res: any[]) => void
    isInstallApp: (...res: any[]) => void
  }
  common?: {
    appVersion?: string
  }
}

export const load5SDK = (): Promise<any> =>
  new Promise((resolve) => {
    loadJSArr([dependencies.WB_SDK.link], () => {
      resolve(window.WBAPP)
    })
  })

export const sdk5 = {
  isInstallApp: (app: App5, options = {}) => {
    return new Promise((resolve, reject) => {
      app?.action?.isInstallApp(options, (_: any) => {
        _ ? resolve({}) : reject({})
      })
    })
  },
  openApp(app: App5, options = {}) {
    return app?.action?.openApp(options)
  },
  getVersion(app: App5) {
    return app?.common?.appVersion
  },
}
/**
 * app内打开
 * @param instance
 * @param appInfo
 */
export const openZZIn5 = (instance: CallAppInstance, appInfo: AppInfo) => {
  logInfo('openZZIn5')

  const {
    options: { delay = 2500, callError = () => {}, callSuccess = () => {}, callFailed = () => {} },
    urlScheme,
  } = instance

  if (!urlScheme) {
    logError(`scheme-uri is invalid`)
    return
  }

  // load sdk
  load5SDK()
    .then((app) => {
      // hack 检测 open状态
      const handleCheck = () =>
        checkOpen(
          () => {
            callFailed()
          },
          callSuccess,
          callError,
          delay
        )

      // sdk
      sdk5.openApp(app, {
        urlschema: urlScheme || appInfo.SCHEMA,
        package: appInfo.ANDROID_PACKAGE_NAME,
        maincls: appInfo.ANDROID_MAINCLS,
      })

      handleCheck()
    })
    .catch((error) => {
      callFailed()
      logError(error)
    })
}
