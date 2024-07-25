import 'vue-router/auto'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module 'vue' {
  interface ComponentCustomProperties {
    /**
     * 检查用户权限
     *
     * @param permissions string[]
     * @returns boolean
     */
    $permission: (permissions: string[]) => boolean
    /**
     * 检查用户角色
     *
     * @param roles string[]
     * @returns boolean
     */
    $role: (roles: string[]) => boolean
  }
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
    VITE_ENABLE_DEVTOOL: string
  }

  import type { MaybeRef } from 'vue'

  type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T)

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

  type ToDictionary<T = any> = Pick<T, 'id' | 'name'>

  type IFormData<T> = Omit<T, 'id' | 'createdTime' | 'updatedTime' | 'deletedTime'>

  import type { FieldRule } from '@arco-design/web-vue'

  type IFormRules = Record<string, FieldRule<any> | FieldRule<any>[]> | undefined

  type IColorName = 'red' | 'orangered' | 'orange' | 'gold' | 'lime' | 'green' | 'cyan' | 'blue' | 'arcoblue' | 'purple' | 'pinkpurple' | 'magenta' | 'gray'
}
