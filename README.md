# 兼容各个浏览器唤起 App

## 测试页面

https://m.zhuanzhuan.com/common/pro_together_run_cli/index.html#/callApp

## 用法

```js
import CallApp from '@zz-common/call-app';

const callApp = new CallApp();
callApp.start(options)
```

## 兼容性

| 场景          | ios | 安卓 
| ------------- | --- | ---- 
| 微信          | ✔️  | ✔️   
| qq            | ✔️  | ✔️   
| chrome        | ✔️  | ✔️   
| 小米 browser  | ✔️  | ✔️   
| uc            | ✔️  | ✔️   
| qq browser    | ✔️  | ✔️   
| 360 browser   | ✔️  | ✔️   
| 猎豹          | ✔️  | ✔️   
| sogou         | ✔️  | ✔️   
| baidu browser | ✔️  | ✔️   
| safari        | ✔️  | ✔️   
| 微博          | X   | X   

## 调起方法详解

```js
/**
 * 端外主动调起app方法
 * tip1：通过一个对象传入
 * tip2：下面任意参数都非必填，默认调起首页（转转）
 * @param urlSearch：
 *        |- 参数openType：home首页（默认），detail详情页，order订单，mysell我卖出的，person个人中心，village小区，web页面
 *        |- 参数id：存放id或者url
 *        |- 其他任意参数均可（兼容新版调起协议）
 * @param channelId：渠道号
 * @param path: 路径(兼容新版调起协议)
 * @param middleWareUrl：中转url，如空则直接跳转下载安装包或appstore
 * @param callback：发起调起请求时的回调
 * @param success：调起成功的回调
 * @param fail：调起失败的回调
 * @param universal: 是否开启通用链接模式
 */
callApp.start({
  universal: true,
  urlSearch:{
    groupId: 786100099271884800
  },
  path:'jump/group/manage/jump',
  callback: function(){
    var lego = new Image();
    lego.src = 'http://lego.58.com/page/mark?callapp';
  },
  success: function(){
    var lego = new Image();
    lego.src = 'http://lego.58.com/page/mark?success';
  },
  fail: function(){
    var lego = new Image();
    lego.src = 'http://lego.58.com/page/mark?fail';
  }，
  middleWareUrl: "https://zhuan.58.com/zz/redirect/download?channelId="+this.download_id
});
```

## 独立下载更新包

```js
/**
 * @param options
 *     |- channelId = 923
 *     |- middleWareUrl
 *     |- path
 */
CallApp.download(options)
```



