import CallApp from '../src'

// 微信唤起app按钮
// var btn = document.getElementById('launch-btn')
// btn.addEventListener('launch', function (e) {
//   console.log('success', e)
// })
// btn.addEventListener('error', function (e) {
//   console.log('fail', e.detail)
// })

// setTimeout(() => {
//   location.href = 'https://mjump.zhuanzhuan.com/zhuanzhuan/index.html';
// }, 2000);

// alert(0)

// location.href = 'https://3rqhu6.openinstall.io/ulink/c/eyJtIjoieUdMdWFteEdsVFVBQUFGMFUzMGZUTWZDb1NVS0NFVnN1bTdTX0pZTUU3ai1sY3dMUEhDb2FWOTBQclFrYlp0cGJrYnUifQ==';

const btn2 = document.getElementById('btn')
const callApp = (window.callApp = new CallApp())
btn2.addEventListener('click', function () {
  callApp.start({
    path: 'jump/core/myBuyList/jump', // 兼容app所有统跳地址
    channelId: '777',
    targetApp: 'zz',
    // wechatStyle: 1, // 1表示浮层右上角，2表示浮层按钮
    universal: true,
    // download: true,
  })
})
