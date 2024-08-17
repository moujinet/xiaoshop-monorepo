import type { ClsModuleOptions } from 'nestjs-cls'

export const ClsModuleConfig: ClsModuleOptions = {
  global: true,
  middleware: {
    mount: true,
    setup: (cls, req) => {
      cls.set<string>('IP', req.ip || 'unknown')
      cls.set<string>('AGENT', req.headers['user-agent'] || '')
    },
  },
}
