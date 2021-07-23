import CallApp from '../src'

console.log(Vue)

const { createApp, onMounted, reactive, watch } = Vue

createApp({
  template: (`
    <div class="wrap">
      <section class="config">
        <div class="display-info">
          <h3 style="height: 10px;font-size: 14px;">参数配置项</h3>
          <div class="config-item">
            <span>path:</span>
            <input type="text" v-model="state.path"/>
          </div>
          <div class="config-item">
            <span>channelId:</span>
            <input type="text" v-model="state.channelId"/>
          </div>
           <div class="config-item">
            <span>deeplinkId:</span>
            <input type="text" v-model="state.deeplinkId"/>
          </div>
          <div class="config-item">
            <span>目标APP:</span>
            <select v-model="state.targetApp">
              <option value="zz" selected>转转</option>
              <option value="zzSeeker">找靓机</option>
            </select>
          </div>

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
    const hooks = {
      callStart: function() {
        console.log('--- trigger --- hook:callStart ')
      },
      callFailed: function() {
        console.log('--- trigger --- hook:callFailed ')
      },
      callSuccess: function() {
        console.log('--- trigger --- hook:callSuccess ')
      },
      callDownload: function() {
        console.log('--- trigger --- hook:callDownload ')
      }
    }
    const { callStart, callSuccess, callFailed, callDownload } = hooks;

    callApp = window.callApp = new CallApp({
      path: 'jump/shortVideo/videoHome/jump', // 兼容app所有统跳地址
      channelId: 'BM_GJ618XC',
      targetApp: 'zz',
      wechatStyle: 1, // 1表示浮层右上角，2表示浮层按钮
      // deeplinkId: getQuery('channelId')
      callStart,
      callSuccess,
      callFailed,
      callDownload
    })

    onMounted(() => {
      console.log('demo onMounted')
    })
    //
    const state = reactive({
      targetApp: 'zz',
      path: 'jump/shortVideo/videoHome/jump',
      channelId: 'BM_GJ618XC',
      deeplinkId: 'BM_GJ618XC',
      //
      urlScheme: '',
      downloadLink: '',
    })
    //
    state.downloadLink = callApp.downloadLink || ''
    state.urlScheme = callApp.urlScheme || ''

    watch(() => state, (opts) => {

      callApp = new CallApp({
        path: opts.path, // 兼容app所有统跳地址
        channelId: opts.channelId,
        targetApp: opts.targetApp,
        wechatStyle: 1, // 1表示浮层右上角，2表示浮层按钮
        deeplinkId: opts.deeplinkId,
        callStart,
        callSuccess,
        callFailed,
        callDownload,
      })

      //
      state.downloadLink = callApp.downloadLink || ''
      state.urlScheme = callApp.urlScheme || ''
    }, { deep: true })

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
      state,
    }
  }
}).mount('#app')


