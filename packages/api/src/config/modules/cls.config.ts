import type { ClsModuleOptions } from 'nestjs-cls'

import { REQUEST_AGENT_KEY, REQUEST_IP_KEY } from '~/common/constants'

export const ClsModuleConfig: ClsModuleOptions = {
  global: true,
  middleware: {
    mount: true,
    setup: (cls, req) => {
      cls.set<string>(REQUEST_IP_KEY, req.ip || 'unknown')
      cls.set<string>(REQUEST_AGENT_KEY, req.headers['user-agent'] || 'unknown')
    },
  },
}
