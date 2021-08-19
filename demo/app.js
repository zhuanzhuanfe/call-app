import CallApp from '../src'

window.__callAppDev__ = true

try {
  // 第三方配置， 唤起支付宝
  // initCustomPage()
  // 检测 m 端是否支持 vue/es6 // 后面考虑 升级脚手架支持vue/react
  initVuePage()
} catch (error) {
  console.error(error)
  initMiniPage({})
}

function initMiniPage(opts) {
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
    },
  }

  var callApp = (window.callApp = new CallApp({
    path: opts.path || 'jump/shortVideo/videoHome/jump', // 兼容app所有统跳地址
    channelId: opts.channelId || 'BM_GJ618XC',
    targetApp: opts.targetApp || 'zz',
    wechatStyle: 1, // 1表示浮层右上角，2表示浮层按钮
    customConfig: opts.customConfig,
    // deeplinkId: getQuery('channelId')
    callStart: hooks.callStart,
    callSuccess: hooks.callSuccess,
    callFailed: hooks.callFailed,
    callDownload: hooks.callDownload,
    callError: hooks.callError,
  }))
  //
  btn_open.onclick = function () {
    console.log(window.navigator.userAgent)
    callApp.start()
  }

  btn_download.onclick = function () {
    callApp.download()
  }

  app.style.cssText = 'display: flex;flex-direction: column;margin-top: 100px'
  btn_download.style.cssText = 'margin-top: 50px;'

  app.appendChild(btn_open)
  app.appendChild(btn_download)
}

function initVuePage() {
  const { createApp, onMounted, reactive, watch } = Vue || window.Vue

  createApp({
    template: `
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
                <option value="">请选择目标app</option>
                <option value="zz">转转</option>
                <option value="zlj">找靓机</option>
                <option value="zzHunter">采货侠</option>
              </select>
            </div>
            <div class="config-item">
              <span>是否支持universal-link:</span>
              <select v-model="state.universal">
                <option value="1">是</option>
                <option value="0">否</option>
              </select>
            </div>
          </div>
        </section>
        <section class="start">
          <button @click="openApp" >唤起app</button>
          <div class="display-info">
            <span>urlScheme:</span>
            <textarea type="textarea" v-model="state.urlScheme"></textarea>
            <span>universalLink:</span>
            <textarea rows="3" cols="20" wrap="hard" type="textarea" v-model="state.universalLink"></textarea>
          </div>
        </section>
        <section class="download">
          <button @click="handleDownload" >下载app</button>
          <div class="display-info">
            <span>downloadLink:</span>
            <textarea type="textarea" rows="3" cols="20" wrap="hard" v-model="state.downloadLink"></textarea>
          </div>
        </section>
      </div>
    `,
    setup() {
      let callApp

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
        },
      }
      const { callStart, callSuccess, callFailed, callDownload, callError } = hooks

      onMounted(() => {
        console.log('demo onMounted')
      })
      //
      var state = reactive({
        targetApp: 'zlj', //
        path: '',
        channelId: 'BM_GJ618XC',
        deeplinkId: 'BM_GJ618XC',
        //
        urlScheme: '',
        downloadLink: '',
        universalLink: '',
        universal: 0,
      })

      watch(
        function () {
          return state
        },
        function (opts) {
          //
          let p =
            opts.targetApp == 'zlj'
              ? 'native_api?type=132&content=%7B%22extra_tab_index%22%3A%220%22%7D'
              : opts.targetApp == 'zz'
              ? 'jump/shortVideo/videoHome/jump'
              : opts.targetApp == 'zzHunter'
              ? 'jump/core/web/jump'
              : ''

          callApp = new CallApp({
            path: opts.path || p, // 兼容app所有统跳地址
            channelId: opts.channelId,
            targetApp: opts.targetApp,
            wechatStyle: 1, // 1表示浮层右上角
            deeplinkId: opts.deeplinkId,
            universal: +opts.universal,
            callStart,
            callSuccess,
            callFailed,
            callDownload,
            callError,
          })

          console.log('callApp', callApp)
          //
          state.downloadLink = callApp.downloadLink || ''
          state.urlScheme = callApp.urlScheme || ''
          state.universalLink = callApp.universalLink || ''
        },
        {
          deep: true,
          immediate: true,
        }
      )

      //
      const openApp = function () {
        console.log(
          window.navigator.userAgent,
          '\n',
          window.navigator.appVersion,
          '\n',
          window.navigator.appName
        )

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
    },
  }).mount('#app')
}

function initCustomPage() {
  initMiniPage({
    customConfig: {
      schemeUrl: 'alipay://platformapi/startapp?appId=20000056',
      landingPage: 'https://render.alipay.com/p/s/i',
    },
  })
}
