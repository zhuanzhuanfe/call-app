import CallApp from '../src'

try {
  // 检测 m 端是否支持 vue/es6 // 后面考虑 升级脚手架支持vue/react
  console.log(window.Vue)
  initVuePage()
} catch (error) {
  console.error(error)
  initMiniPage()
}

function initMiniPage() {
  var app = document.querySelector('#app')
  var btn_open = document.createElement('button')
  btn_open.innerText = '唤起'
  var btn_download = document.createElement('button')
  btn_download.innerText = '下载'
  //
  var hooks = {
    callStart: function () {
      console.log('--- trigger --- hook:callStart ')
    },
    callFailed: function () {
      console.log('--- trigger --- hook:callFailed ')
    },
    callSuccess: function () {
      console.log('--- trigger --- hook:callSuccess ')
    },
    callDownload: function () {
      console.log('--- trigger --- hook:callDownload ')
    },
    callError: function () {
      console.log('--- trigger --- hook:callError ')
    }
  };

  var callApp = window.callApp = new CallApp({
    path: 'jump/shortVideo/videoHome/jump', // 兼容app所有统跳地址
    channelId: 'BM_GJ618XC',
    targetApp: 'zz',
    wechatStyle: 1, // 1表示浮层右上角，2表示浮层按钮
    // deeplinkId: getQuery('channelId')
    callStart: hooks.callStart,
    callSuccess: hooks.callSuccess,
    callFailed: hooks.callFailed,
    callDownload: hooks.callDownload,
    callError: hooks.callError
  });
  //
  btn_open.onclick = function() {
    console.log(window.navigator.userAgent)
    callApp.start()
  }

  btn_download.onclick = function() {
    callApp.download()
  }

  app.style.cssText = 'display: flex;flex-direction: column;margin-top: 100px'
  btn_download.style.cssText = 'margin-top: 50px;'

  app.appendChild(btn_open)
  app.appendChild(btn_download)
}

function initVuePage() {
  const {
    createApp,
    onMounted,
    reactive,
    watch
  } = Vue || window.Vue;

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
          <span>universalLink:</span>
          <textarea rows="3" cols="20" wrap="hard" type="textarea" disabled v-model="state.universalLink"></textarea>
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
        callStart: function () {
          console.log('--- trigger --- hook:callStart ')
        },
        callFailed: function () {
          console.log('--- trigger --- hook:callFailed ')
        },
        callSuccess: function () {
          console.log('--- trigger --- hook:callSuccess ')
        },
        callDownload: function () {
          console.log('--- trigger --- hook:callDownload ')
        },
        callError: function () {
          console.log('--- trigger --- hook:callError ')
        }
      }
      const {
        callStart,
        callSuccess,
        callFailed,
        callDownload,
        callError
      } = hooks;

      onMounted(() => {
        console.log('demo onMounted')
      })
      //
      var state = reactive({
        targetApp: 'zz',
        path: 'jump/shortVideo/videoHome/jump',
        channelId: 'BM_GJ618XC',
        deeplinkId: 'BM_GJ618XC',
        //
        urlScheme: '',
        downloadLink: '',
        universalLink: ''
      })

      watch(function () {
        return state
      }, function (opts) {
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
          callError
        })

        // console.log('callApp', callApp)
        //
        state.downloadLink = callApp.downloadLink || ''
        state.urlScheme = callApp.urlScheme || ''
        state.universalLink = callApp.universalLink || ''

      }, {
        deep: true,
        immediate: true
      });

      //
      const openApp = function () {
        console.log(window.navigator.userAgent)
        console.log('trigger start')
        callApp.start()
        state.downloadLink = callApp.downloadLink || ''
        state.urlScheme = callApp.urlScheme || ''
        state.universalLink = callApp.universalLink || ''
      }
      //
      const handleDownload = function () {
        console.log('trigger download')

        callApp.download()

        state.downloadLink = callApp.downloadLink || ''
        state.urlScheme = callApp.urlScheme || ''
        state.universalLink = callApp.universalLink || ''
      }

      return {
        openApp,
        handleDownload,
        state,
      }
    }
  }).mount('#app')

}
