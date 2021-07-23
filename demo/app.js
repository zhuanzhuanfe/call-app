import CallApp from '../src'

console.log(Vue)

const { createApp, onMounted, reactive } = Vue

createApp({
  template: (`
    <div class="wrap">
      <section class="start">
        <div class="display-info">
          <span>目标APP:</span>
          <select v-model="state.targetApp" @change="changeTarget">
            <option value="zz" selected>转转</option>
            <option value="zzSeeker">找靓机</option>
          </select>
        </div>
      </section>
      <section class="start">
        <button @click="openApp" >唤起app</button>
        <div class="display-info">
          <span>urlScheme:</span>
          <textarea type="textarea" disabled v-model="state.urlScheme"></textarea>
        </div>
      </section>
      <section class="download">
        <button @click="handleDownload" >下载app</button>
        <div class="display-info">
          <span>downloadLink:</span>
          <textarea type="textarea" rows="3" cols="20" wrap="hard" disabled v-model="state.downloadLink"></textarea>
        </div>
      </section>

    </div>
  `),
  setup() {
    let callApp;

    callApp = window.callApp = new CallApp({
      path: 'jump/shortVideo/videoHome/jump', // 兼容app所有统跳地址
      channelId: 'BM_GJ618XC',
      targetApp: 'zz',
      wechatStyle: 1, // 1表示浮层右上角，2表示浮层按钮
      // deeplinkId: getQuery('channelId')
    })

    console.log(callApp)

    onMounted(() => {
      console.log('onMounted')
    })
    //
    const state = reactive({
      urlScheme: '',
      downloadLink: '',
      targetApp: 'zz'
    })
    //
    state.downloadLink = callApp.downloadLink || ''
    state.urlScheme = callApp.urlScheme || ''

    const changeTarget = (e) => {
      console.log(e.target.value)
      const v = e.target.value;
      if(v == 'zz') {
        //
        callApp = new CallApp({
          path: 'jump/shortVideo/videoHome/jump', // 兼容app所有统跳地址
          channelId: 'BM_GJ618XC',
          targetApp: 'zz',
          wechatStyle: 1, // 1表示浮层右上角，2表示浮层按钮
          // deeplinkId: getQuery('channelId')
        })
        //
        state.downloadLink = callApp.downloadLink || ''
        state.urlScheme = callApp.urlScheme || ''
      } else if(v == 'zzSeeker') {
        //
        callApp = new CallApp({
          path: 'jump/shortVideo/videoHome/jump', // 兼容app所有统跳地址
          channelId: 'BM_GJ618XC',
          targetApp: 'zzSeeker',
          wechatStyle: 1, // 1表示浮层右上角，2表示浮层按钮
          // deeplinkId: getQuery('channelId')
        })
        //
        state.downloadLink = callApp.downloadLink || ''
        state.urlScheme = callApp.urlScheme || ''
      }
    }
    //
    const openApp = () => {
      console.log('trigger start')
      callApp.start()
      state.downloadLink = callApp.downloadLink || ''
      state.urlScheme = callApp.urlScheme || ''
    }
    //
    const handleDownload = () => {
      console.log('trigger download')
      callApp.download()
      state.downloadLink = callApp.downloadLink || ''
      state.urlScheme = callApp.urlScheme || ''
    }

    return {
      openApp,
      handleDownload,
      changeTarget,
      state,
    }
  }
}).mount('#app')


