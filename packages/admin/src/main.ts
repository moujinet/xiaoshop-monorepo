import Mock from 'mockjs'
import { setupApi } from '~/utils/api'
import { IS_DEBUG_MODE } from '~/constants/env'
import App from '~/app.vue'

import 'uno.css'
import '@arco-design/web-vue/es/message/style/css'
import '@arco-design/web-vue/es/notification/style/css'
import '~/styles/index.less'

createAdminClient(
  App,
  async () => {
    // Setup API
    setupApi()

    // Load all mocks
    if (IS_DEBUG_MODE) {
      Mock.setup({
        timeout: '100-600',
      })

      loadMocks()
    }
  },
)
