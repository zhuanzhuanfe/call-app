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




## 兼容性

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
