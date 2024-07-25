import App from '~/app.vue'
import { setupApi } from '~/utils/api'

import 'uno.css'
import '@arco-design/web-vue/es/message/style/css'
import '@arco-design/web-vue/es/notification/style/css'
import '~/styles/index.less'

import 'video.js/dist/video-js.css'

createAdminClient(
  App,
  async () => {
    setupApi()

    // 缓存地区信息
    useAreas().init()
  },
)
