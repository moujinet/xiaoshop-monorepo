import Mock from 'mockjs'
import { setupApi } from '~/utils/api'
import { IS_DEBUG_MODE } from '~/constants/env'
import App from '~/app.vue'

import '~/styles/index.less'

createAdminClient(
  App,
  async () => {
    // Setup API
    setupApi()

    // Load all mocks
    if (IS_DEBUG_MODE) {
      Mock.setup({
        timeout: '600-1000',
      })

      loadMocks()
    }
  },
)
