# 简介

`call-app` 是一个基于 `typescript` 开发的通用的唤起 app 的 sdk, 支持唤起多个app, 兼容主流浏览器、webview，并支持用户自定义唤起配置。

## 快速上手

### Step1：安装

通过 `npm` 安装

```bash
npm i call-app -S
```

### Step2：引入

```js
import CallApp from 'call-app'
```

如果是通过外链 js 引入，那么可以使用 `window.CallApp` 得到 `CallApp` 类

### Step3：使用

实例化 `CallApp` 后，即可使用 `start` 和 `download` 方法.

```javascript
// 实例化
const callApp = new CallApp({
  path: '', // 要唤起目标 app 的 path ，默认目标app是转转
})
// 执行 唤起方法
callApp.start()
// 执行 下载
callApp.download()
```
或者
```javascript
// 实例化
const callApp = new CallApp()
// 执行 唤起方法
callApp.start({
  path: '', // 要唤起目标 app 的 path ，默认目标app是转转
})
// 执行 下载
callApp.download()
```
#### 参数配置项

- **customConfig** `Object` 用户定义配置项, 高阶配置，用法可参考下面示例
  - **schemeUrl** `String`  scheme uri 地址
  - **downloadConfig** `Object`  下载配置，可选，不传则采用 landingPage
    - **ios**  `String`  app-store 链接
    - **android** `String`  apk下载链接
    - **android_yyb** `String` 应用宝 下载链接
  - **universalLink** `String` universal-link链接，可选，ios 会优先采用 universal-link
  - **landingPage** `String` 唤起失败落地页，一般是下载中间页，优先级高于 `downloadConfig`

- **path** `String` 调起 app 时，默认打开的页面，类型为 app 的统跳地址.
- **channelId** `String` 渠道号，可选，当用户没有安装 app 时，默认下载的渠道号，安卓支持，iOS 不支持（选填）
- **targetApp** `String` 调起的目标 app，优先级低于 path 的 prefix，其中：`zz`(代表转转app), `zlj`(代表找靓机app), `zzHunter`(代表采货侠app), `zzSeller`(代表转转卖家版、已废弃), `wxMini`(代表微信小程序,目前只支持转转wx小程序)，默认为`zz`  （选填）
- **universal** `Boolean` 是否开启通用链接调起模式，默认为`true`
- **download** `Boolean` 是否会自动跳转下载页面，默认为 `true`
- **middleWareUrl** `String` 中转 url，如为空则默认跳转下载安装包或 appstore
- **delay** `Number` 调起app失败后触发下载延迟, 默认 2500（毫秒）
- **callStart** `Function` 开始执行调起时的hook
- **callSuccess** `Function` 执行调起成功时的hook
- **callFailed** `Function` 执行调起失败时的hook
- **callDownload** `Function` 执行下载时的hook
- **callError** `Function` 内部异常时的hook

- **urlSearch** `Object` [已废弃] 指定页面调起方式，不推荐，直接设置 path 来跳转即可
  - **openType** `String` 页面类型，可选值为 `home首页（默认），detail详情页，order订单，mysell我卖出的，person个人中心，village小区，web页面`
  - **id** `String` 存放 id 或者 url，配合`openType` 的值来用

- **onWechatReady** `Function` 微信端sdk初始化成功后的回调


#### api 方法

- **start** `Function` 唤起功能

```js
// 挂在CallApp实例上的方法
// options 可选 配置同上
const callApp = new CallApp()
callApp.start(options)
```

- **download** `Function`  下载功能

```js
// 挂在CallApp实例上的方法
// options 可选 配置同上
const callApp = new CallApp()
callApp.download(options)
```

## 示例用法

##### 1. 初始化实例时配置 options，唤起 转转/找靓机

```javascript
// 引入 lego 埋点 (使用callApp基础库 务必引入埋点上报)
import { lego } from 'lego'
// 唤起 转转
const callApp = new CallApp({
  path: 'zhuanzhuan://jump/shortVideo/videoHome/jump', // 带 prefix
  channelId: '', //  渠道id ，下载渠道包
  deeplinkId: '', // 后台配置项
  targetApp: 'zz', // zz 代表转转，zlj 代表找靓机，zzHunter 代表采货侠；默认 zz
  callStart() {
    lego.send({
      actiontype: 'DOWNLOADAPP-START',
      pagetype: 'ZZDOWNLOADH5',
      backup: { channelId },
    })
    console.log('ZZDOWNLOADH5 callStart')
  },
  callSuccess() {
    lego.send({
      actiontype: 'DOWNLOADAPP-SUCCESS',
      pagetype: 'ZZDOWNLOADH5',
      backup: { channelId },
    })
    console.log('ZZDOWNLOADH5 callSuccess')
  },
  callFailed() {
    lego.send({
      actiontype: 'DOWNLOADAPP-FAILED',
      pagetype: 'ZZDOWNLOADH5',
      backup: { channelId },
    })
    console.log('ZZDOWNLOADH5 callFailed')
  },
  callDownload() {
    lego.send({
      actiontype: 'DOWNLOADAPP-DOWNLOAD',
      pagetype: 'ZZDOWNLOADH5',
      backup: { channelId },
    })
    console.log('ZZDOWNLOADH5 callDownload')
  }
  callError: () => {
    console.log('内部异常')
  },
})

// 执行唤起
callApp.start()
// 执行下载
callApp.download()
```

```javascript
// 唤起 找靓机
const callApp = new CallApp({
  path: 'native_api?type=132',
  // path: 'zljgo://native_api?type=132'
  targetApp: 'zlj',
  universal: false, // 找靓机目前还不支持 universalLink
  callStart: () => {
    console.log('触发 开始唤起钩子')
  },
  callSuccess: () => {
    console.log('触发 唤起成功钩子')
  },
  callFailed: () => {
    console.log('触发 唤起失败钩子')
  },
  callDownload: () => {
    console.log('触发 下载钩子')
  },
  callError: () => {
    console.log('内部异常')
  },
})

// 执行唤起
callApp.start()
// 执行下载
callApp.download()
```

#####  2. 调用 api 时配置 options, 唤起 转转/找靓机

该用法为 实例化CallApp类一次，通过 api 来配置 options，进行执行。
此一般用于较复杂业务场景下，避免多次实例化而造成内存浪费。

```javascript
// 实例化一次
const callApp = new CallApp()
// 在方法内进行参数配置

// 唤起转转
callApp.start({
  path: 'jump/shortVideo/videoHome/jump',
  channelId: '',
  deeplinkId: '',
})

// 唤起找靓机
callApp.start({
  path: 'native_api?type=132',
  // path: 'zljgo://native_api?type=132',
  targetApp: 'zlj',
  universal: false, // 找靓机、采货侠 目前还不支持 universalLink
})

// 下载转转
callApp.download({
  targetApp: 'zz',
  channelId: '',
  deeplinkId: ''
})

// 下载找靓机
callApp.download({
  targetApp: 'zlj',
})
```

##### 3. 第三方配置（高阶）

⚠️ 注意：

3-1. 如果配置了 `customConfig` 参数，则非 hooks 参数（如 path，targetApp 等）的配置不再生效。

3-2 `landingPage` 配置参数优先级大于 `downloadConfig`

3-3 如果没有配置 `universalLink` 则 ios 端降级为 `schemeUrl`

```javascript
// 唤起支付宝
const callApp = new CallApp({
  customConfig: {
    schemeUrl: 'alipay://platformapi/startapp?appId=20000056', // 支付宝转账
    landingPage: 'https://render.alipay.com/p/s/i', // 支付宝落地页（下载页）
  },
  callStart: () => {
    console.log('触发 开始唤起钩子')
  },
  callSuccess: () => {
    console.log('触发 唤起成功钩子')
  },
  callFailed: () => {
    console.log('触发 唤起失败钩子')
  },
})

callApp.start()
```

##### 4. 插件配置（高阶）
提供 use 方法, 方便用户插入 js 或者 自定义 CallApp 实例内部方法。并支持链式调用。

使用示例：
```javascript
const callApp = new CallApp(options)

callApp.use(function PluginA(app, optsA) {
  const old = app.start

  app.start = function() {
    //
    old.call(app) // 或者 old.call(app, options)
  }
}).use(function PluginB(app, optsB) {
  //

})
```

## 兼容性 😈

### H5
#### ios: [iphoneXR]


| 环境          | 下载          | scheme/ulink 唤起(已装 app) | 失败回调(已装 app) | 成功回调(已装 app)       | 失败回调(未装 app) |
| ------------- | ------------- | --------------------------- | ------------------ | ------------------------ | ------------------ |
| safari        | 支持 location | ulink 支持                  | 不支持             | 支持                     | ulink不支持        |
| qq 浏览器     | 支持 location | ulink 支持                  | 支持               | 支持                     | ulink不支持        |
| uc 浏览器     | 支持 location | ulink 支持                  | 支持               | ulink支持, scheme 不支持 | ulink不支持        |
| 百度浏览器    | 支持 location | ulink 支持, scheme 不支持   | 支持               | ulink支持 scheme 不支持  | ulink不支持        |
| 夸克浏览器    | 支持 iFrame   | 不支持 ulink，支持 scheme   | 支持               | 支持                     | 支持               |
| 谷歌浏览器    | 支持 location | ulink 支持                  | 支持               | 支持                     | ulink不支持        |
| sougou 浏览器 | 不支持        | ulink 支持                  | 支持               | 支持                     | ulink不支持        |
| wx            | 支持，应用宝  | ulink 支持, scheme 不支持   | 支持               | 支持                     | ulink不支持        |
| weibo         | 不支持        | ulink 支持, scheme 不支持   | 支持               | ulink支持,scheme 不支持  | ulink不支持        |
| qq            | 支持, 应用宝  | ulink 支持                  | 支持               | 支持                     | 支持               |

#### android: [huawei-p30]


| 环境          | 下载          | scheme 唤起(已装 app) | 失败回调(已装 app) | 成功回调(已装 app) | 失败回调(未装 app) |
| ------------- | ------------- | --------------------- | ------------------ | ------------------ | ------------------ |
| qq 浏览器     | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| uc 浏览器     | 支持 tagA     | 支持                  | 支持               | 支持               | 支持               |
| 百度浏览器    | 支持 location | 不支持                | 支持               | 不支持             | 支持               |
| 夸克浏览器    | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| sougou 浏览器 | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| 360 浏览器    | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| 华为浏览器    | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| wx            | 支持，应用宝  | 不支持                | 支持               | 不支持             | 支持               |
| weibo         | 不支持        | 不支持                | 支持               | 不支持             | 支持               |
| qq            | 支持, 应用宝  | 支持                  | 支持               | 支持               | 支持               |

#### android: [mi-9]


| 环境       | 下载          | scheme 唤起(已装 app) | 失败回调(已装 app) | 成功回调(已装 app) | 失败回调(未装 app) |
| ---------- | ------------- | --------------------- | ------------------ | ------------------ | ------------------ |
| qq 浏览器  | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| uc 浏览器  | 支持 tagA     | 支持                  | 支持               | 支持               | 支持               |
| 百度浏览器 | 支持 location | 不支持                | 支持               | 不支持             | 支持               |
| 夸克浏览器 | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| 360 浏览器 | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| 小米浏览器 | 支持 location | 支持                  | 支持               | 支持               | 支持               |
| wx         | 支持，应用宝  | 不支持                | 支持               | 不支持             | 支持               |
| weibo      | 不支持        | 不支持                | 支持               | 不支持             | 支持               |
| qq         | 支持，应用宝  | 支持                  | 支持               | 支持               | 支持               |

### native sdk

#### ios / android


|                         | 转转 | 采货侠 | 找靓机 | 卖家版 | 58app | 微信 |
| ----------------------- | ---- | ------ | ------ | ------ | ----- | ---- |
| 目标app: 转转           | x    | ✅      | ✅      | ✅      | ✅     | ✅    |
| 目标app: 采货侠         | ✅    | x      | x      | x      | x     | x    |
| 目标app: 找靓机         | ✅    | x      | x      | x      | x     | x    |
| 目标app: 卖家版(已下架) | ✅    | x      | x      | x      | x     | x    |


---

### 公开文章


### Bug or PR
[唤起 App 在转转的实践](https://mp.weixin.qq.com/s?__biz=MzU0OTExNzYwNg==&mid=2247486327&idx=1&sn=a4ed8b1b012638a60bd4065a6e5ee309)
[复杂场景下唤起App实践](https://mp.weixin.qq.com/s?__biz=MzU0OTExNzYwNg==&mid=2247492140&idx=1&sn=9857ecdf80285020dd90fd3d26fb717d)


### Feature
<!-- - [ ] 支持配置中心
  - 未来可以引入配置中心的概念，方便对目标app进行统一配置管理、app平台相关逻辑的平滑处理，方便新增/移除目标app逻辑
- [ ] 支持 android app-links(intent) 协议，以及面向未来的 deferAppLinks
  - 目前此方案兼容性差（只有chrome支持)，暂且舍弃 -->
