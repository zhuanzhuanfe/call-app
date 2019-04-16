# call-app@0.0.1

> [git库地址](http://gitlab.zhuanspirit.com/call-app)

文档线上地址：《[文档](https://fe.zhuanspirit.com/call-app/)》

转转FE打包模版

## 命令

```bash
# 本地测试模式，外链形式
$ npm run dev
# 编译es5，es6代码，例如lib，es文件夹
$ npm run compile
# 编译代码，外链形式
$ npm run dist
# 打包编译，集成compile 和 dist
$ npm run build
# 发布npm包，同时gitlab标签
$ npm run pub
# 发布npm的beta包，同时gitlab标签
$ npm run pub-beta
# 删除gitlab及npm包对应版本代码
$ npm run unpub
# 打开开发文档在浏览器中运行
$ npm run doc
# 编译开发文档
$ npm run build-doc
# 上传文档到ftp
$ npm run doc-upload
```

## publish

此`npm`包针对 `npm publish` 命令进行了单独封装，可实现`publish`的同时，生成`gitlab`版本标签，命令如下：

```bash
$ npm run pub
```

## 按需加载

```bash
$ npm i babel-plugin-import -D
```

此npm包实现了按需加载，使用时，需要设置babel配置，如下：

```javascript
"plugins": [
  ["import", {
    "libraryName": "call-app"}]
]
```

## 使用

### npm

```javascritp
$ npm i call-app -S
```

### CDN

```javascript
<script src="https://m.zhuanzhuan.com/common/call-app/static/js/index.js?v=2.1.0"></script>
<script src="https://m.zhuanzhuan.com/common/call-app/static/js/index.min.js?v=2.1.0"></script>
```

### 文档
结合jsdoc写文档,语法可查看：《[jsdoc使用](https://www.css88.com/doc/jsdoc/tags-example.html)》

新增及修改函数，按照jsdoc语法规则来写注释

其中 call-app 为你自己的npm包名

目前第一版还不支持css的解析，如果有需要可告知后升级

可参考：[@zz/lego](http://gitlab.zhuanspirit.com/zz-fe/common-zz-lego)