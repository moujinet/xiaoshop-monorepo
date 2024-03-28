import 'vue-router/auto'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module 'vue-router' {
  interface RouteMeta {
    id?: string
    space?: string
    module?: string
    name?: string
    desc?: string
    icon?: string
    isLayout?: boolean
  }
}

declare global {
  interface ImportMetaEnv {
    VITE_BASE_URL: string
    VITE_APP_NAME: string
    VITE_APP_NAME_SHORT: string
    VITE_API_BASE_URL: string
    VITE_API_REQUEST_TIMEOUT: number
  }

  interface IApiResponse<T = any> {
    code: number
    message?: string
    data: T
  }

  interface IApiPaginationResult<T = any> {
    result: T[]
    current: number
    total: number
    pageSize: number
  }

  interface IDictionary {
    id: string
    name: string
  }

  interface ICache<T = any> {
    cached: number
    data: T
  }

  interface IKeyValue<T = any> {
    [key: string]: T
  }
}
