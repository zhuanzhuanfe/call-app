import CallApp from '../src'

console.log(Vue)

const { createApp, onMounted, reactive } = Vue

createApp({
  template: (`
    <div class="wrap">
      <section class="start">
        <button @click="openApp" >唤起app</button>
        <div class="display-info">
          <span>urlScheme:</span>
          <textarea type="textarea" disabled v-model="urlScheme"></textarea>
        </div>
      </section>
      <section class="download">
        <button @click="handleDownload" >下载app</button>
        <div class="display-info">
          <span>downloadLink:</span>
          <textarea type="textarea" rows="3" cols="20" wrap="hard" disabled v-model="downloadLink"></textarea>
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
      downloadLink: ''
    })
    //
    state.downloadLink = callApp.downloadLink || ''
    state.urlScheme = callApp.urlScheme || ''

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
      ...state,
    }
  }
}).mount('#app')


