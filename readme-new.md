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
