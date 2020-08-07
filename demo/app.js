import CallApp from '../src'

const btn = document.getElementById('btn')
const callApp = (window.callApp = new CallApp())
btn.addEventListener('click', function () {
  callApp.start({
    path: 'jump/group/manage/jump', // 兼容app所有统跳地址
    channelId: '777',
    download: true,
    // targetApp: 'yige',
    // universal: true,
  })
})
