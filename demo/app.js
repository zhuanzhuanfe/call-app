import CallApp from '../src';

const btn = document.getElementById('btn');
btn.addEventListener('click', function() {
  const callApp = new CallApp();
  callApp.start({
    path:'jump/group/manage/jump', // 兼容app所有统跳地址
    channelId: '777',
    universal: true,
  });
});
