# 简介
`@zz-common/call-app` 是一个基于 `typescript` 开发的通用的唤起 app 的 sdk, 目前兼容转转/找靓机app, 兼容主流浏览器，并支持用户自定义唤起目标app配置。

体验地址：

## 快速上手

### Step1：安装
通过 `npm` 安装

```bash
npm i @zz-common/call-app -S
```


### Step2：引入
```js
import CallApp from '@zz-common/call-app';
```
如果是通过外链 js 引入，那么可以使用 `window.CallApp` 得到 `CallApp` 类

###  Step3：使用

实例化 `CallApp` 后，即可使用 `start` 和 `download` 方法.

```javascript
// 实例化
const callApp = new CallApp({
  path: '' // 要唤起目标 app 的路径，默认目标app是转转
})
// 执行 唤起方法
callApp.start()
// 执行 下载
callApp.download()

```

#### 参数配置项





#### api 方法




#### 示例代码

1. 配置options，唤起 转转/找靓机

```javascript
// 唤起 转转
const callApp = new CallApp({
  path: 'jump/shortVideo/videoHome/jump',
  channelId: '', //  渠道id
  deeplinkId: '',  //
  targetApp: 'zz', // 默认 转转
  callStart: () => { console.log('触发 开始唤起钩子') },
  callSuccess: () => { console.log('触发 唤起成功钩子') },
  callFailed: () => { console.log('触发 唤起失败钩子') },
  callDownload: () => { console.log('触发 下载钩子') },
  callError: () => { console.log('内部异常') }
})

// 执行唤起
callApp.start()
// 执行下载
callApp.download()
```

```javascript
// 唤起 找靓机
const callApp = new CallApp({
  path: 'native_api?type=132&content=%7B%22extra_tab_index%22%3A%220%22%7D',
  targetApp: 'zzSeeker',
  callStart: () => { console.log('触发 开始唤起钩子') },
  callSuccess: () => { console.log('触发 唤起成功钩子') },
  callFailed: () => { console.log('触发 唤起失败钩子') },
  callDownload: () => { console.log('触发 下载钩子') },
  callError: () => { console.log('内部异常') }
})

// 执行唤起
callApp.start()
// 执行下载
callApp.download()
```

2. 方法中进行配置（高阶）
该用法为高阶用法，仅仅实例化类一次，通过 api 来配置 options，进行执行。
此一般用于较复杂业务场景下，避免多次实例化而造成内存浪费。

```javascript
// 实例化一次
const callApp = new CallApp()
// 在方法内进行参数配置

// 唤起转转
callApp.start({
  path: 'jump/shortVideo/videoHome/jump',
  channelId: '', //  渠道id
  deeplinkId: '',  //
  targetApp: 'zz', // 默认 转转
})

// 唤起找靓机
callApp.start({
  path: 'native_api?type=132&content=%7B%22extra_tab_index%22%3A%220%22%7D',
  targetApp: 'zzSeeker', // 默认 转转
})

// 下载转转
callApp.download({
  channelId: '', //  渠道id
  deeplinkId: '',  //
  targetApp: 'zz', // 默认 转转
})

// 下载找靓机
callApp.download({
  targetApp: 'zzSeeker',
})
```

1. 第三方配置（高阶）
 ⚠️ 注意：
3-1. 如果配置了 customConfig 参数，则 path，targetApp 的逻辑不再执行。

3-2 landingPage 配置优先级大于 downloadConfig

3-3 如果没有配置 universalLink 则 ios 端降级为 schemeUrl

```javascript
// 唤起支付宝
const callApp = new CallApp({
  customConfig: {
    schemeUrl: 'alipay://platformapi/startapp?appId=20000056', // 支付宝转账
    landingPage: 'https://render.alipay.com/p/s/i', // 支付宝落地页（下载页）
  }
})

callApp.start()

```
## 兼容性 😈

#### ios: [iphoneXR]

| 环境         | 下载               | scheme/ulink 唤起(已装app) | 失败回调(已装app) | 成功回调(已装app)   | 失败回调(未装app)   |
| ------------ | ------------------ | -------------------------- | ----------------- | ------------------- | ------------------- |
| safari       | 支持 location 正常 | ulink  支持                | 不支持            | 支持                | 不支持（跳u-link）  |
| qq浏览器     | 支持 location 正常 | ulink  支持                | 支持              | 支持                | 不支持（跳u-link）  |
| uc浏览器     | 支持 location 正常 | ulink 支持 , scheme 不支持 | 支持              | 支持, scheme 不支持 | 不支持（跳u-link）  |
| 百度浏览器   | 支持 location 正常 | ulink 支持, scheme 不支持  | 支持              | 支持 scheme 不支持  | 不支持（跳u-link）  |
| 夸克浏览器   | 支持 iFrame 正常   | 不支持 ulink，支持 scheme  | 支持              | 支持                | 支持                |
| 谷歌浏览器   | 支持 location 正常 | ulink  支持                | 支持              | 支持                | 不支持（跳u-link）  |
| sougou浏览器 | 不支持             | ulink  支持                | 支持              | 支持                | 不支持（跳u-link）  |
| wx           | 支持，             | ulink支持                  | 支持              | 支持                | 不支持（跳u-link）  |
| weibo        | 不支持	ulink       | 支持, scheme 不支持        | 支持              | 支持,scheme 不支持  | 不支持（跳u-link）  |
| qq           | 支持, 应用宝       | ulink支持                  | 支持              | 支持                | 支持 (不会跳u-link) |



#### android: [huawei-p30]

| 环境         | 下载               | scheme 唤起(已装app) | 失败回调(已装app) | 成功回调(已装app)        | 失败回调(未装app) |
| ------------ | ------------------ | -------------------------- | ----------------- | ------------------------ | ----------------- |
| qq浏览器     | 支持 location 正常 | 支持                       | 支持              | 支持                     | 支持              |
| uc浏览器     | 支持 tagA 正常     | 支持                       | 支持              | 支持                     | 支持              |
| 百度浏览器   | 支持 location 正常 | 不支持                     | 支持              | 不支持（scheme无法唤起)  | 支持              |
| 夸克浏览器   | 支持 location 正常 | 支持                       | 支持              | 支持                     | 支持              |
| sougou浏览器 | 支持 location 正常 | 支持                       | 支持              | 支持                     | 支持              |
| 360浏览器    | 支持 location 正常 | 支持                       | 支持              | 支持                     | 支持              |
| 华为浏览器   | 支持 location 正常 | 支持                       | 支持              | 支持                     | 支持              |
| wx           | 支持，应用宝       | 不支持                     | 支持              | 不支持（scheme无法唤起） | 支持              |
| weibo        | 不支持             | 不支持                     | 支持              | 不支持                   | 支持              |
| qq           | 支持, 应用宝       | 支持                       | 支持              | 支持                     | 支持              |



#### android: [mi-9]

| 环境       | 下载               | scheme 唤起(已装app) | 失败回调(已装app) | 成功回调(已装app)        | 失败回调(未装app) |
| ---------- | ------------------ | -------------------------- | ----------------- | ------------------------ | ----------------- |
| qq浏览器   | 支持 location 正常 | 支持                       | 支持              | 支持                     | 支持              |
| uc浏览器   | 支持 tagA 正常     | 支持                       | 支持              | 支持                     | 支持              |
| 百度浏览器 | 支持 location 正常 | 不支持                     | 支持              | 不支持（scheme无法唤起)  | 支持              |
| 夸克浏览器 | 支持 location 正常 | 支持                       | 支持              | 支持                     | 支持              |
| 360浏览器  | 支持 location 正常 | 支持                       | 支持              | 支持                     | 支持              |
| 小米浏览器 | 支持 location 正常 | 支持                       | 支持              | 支持                     | 支持              |
| wx         | 支持，应用宝       | 不支持                     | 支持              | 不支持（scheme无法唤起） | 支持              |
| weibo      | 不支持             | 不支持                     | 支持              | 不支持                   | 支持              |
| qq         | 支持，应用宝       | 支持                       | 支持              | 支持                     | 支持              |
