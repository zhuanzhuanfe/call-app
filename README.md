# callApp

> webpage call APP

# install
``` bash
npm set registry http://zzfe.cnpm.58corp.com
npm install @zz-vc/callApp --save-dev

或在webpack配置文件中设置后安装
``` 
# usage

## 默认在window下创建callApp实例，可以直接使用该实例调起

## 或实例化一个对象：var callAPP = new CallApp(config);
> config：appd调起的各项参数（转转默认不用传）

## [可选]微信下定义方法，可检测到是否安装app
``` bash
    document.addEventListener("wechatCheckInstallState",function(){
        if(callApp.hasApp == 1){
          //todo sth
        }
    }, false)
``` 

## 调起方法
``` bash
      //例子1
      callApp.start({
        channelId: 555,
        urlSearch: {
          openType:"home"
        }
      });
      //例子2
       callApp.start({
              urlSearch:{
                groupId:786100099271884800
              },
              path:'jump/group/manage/jump',
              callback:function(){
                  var lego = new Image();
                  lego.src = 'http://lego.58.com/page/mark?callapp';
              },
              success:function(){
                var lego = new Image();
                lego.src = 'http://lego.58.com/page/mark?success';
              },
              fail:function(){
                var lego = new Image();
                lego.src = 'http://lego.58.com/page/mark?fail';
              }，
              middleWareUrl:"https://zhuan.58.com/zz/redirect/download?channelId="+this.download_id
            });
      
``` 
## 调起参数
``` bash
   /**
      * 端外主动调起app方法
      * tip1：通过一个对象传入
      * tip2：下面任意参数都非必填，默认调起首页（转转）
      * @param urlSearch：
      *        |- 参数openType：home首页（默认），detail详情页，order订单，mysell我卖出的，person个人中心，village小区，web页面
      *        |- 参数id：存放id或者url
      *        |- 其他任意参数均可（兼容新版调起协议）
      * @param channelId：渠道号
      * @param path:路径(兼容新版调起协议)
      * @param middleWareUrl：中转url，如空则直接跳转下载安装包或appstore
      * @param callback：发起调起请求时的回调
      * @param success：调起成功的回调
      * @param fail：调起失败的回调
      */
``` 

# Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
# 默认外链地址
```
https://s1.zhuanstatic.com/common/zzapp/static/js/CallApp.js
```
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).