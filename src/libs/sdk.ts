import { App58, CallAppInstance } from '../../types'
import { AppInfo, dependencies } from './config'
import { checkOpen } from './evoke'
import { loadJSArr } from './utils'

export const load58SDK = () =>
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
 * @param schemeUrl
 * @param app
 * @param appInfo
 */
export const openZZIn58 = async (instance: CallAppInstance, appInfo: AppInfo) => {
  console.log('openZZIn58')

  try {
    const {
      options: {
        delay = 2500,
        callError = () => {},
        callSuccess = () => {},
        callFailed = () => {},
      },
      urlScheme,
    } = instance

    if (!urlScheme) {
      console.error
        ? console.error(`schemeUrl is invalid`)
        : console.log(`Error: \n schemeUrl is invalid`)
      return
    }
    // load sdk
    const app: any = await load58SDK()
    // hack 检测 open状态
    const handleCheck = () =>
      checkOpen(
        () => {
          callFailed()
          instance.download()
        },
        () => {
          callSuccess()
        },
        () => {
          callError()
        },
        delay || 2500
      )

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

