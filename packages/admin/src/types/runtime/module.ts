import type { IMenuDefinition } from './menu'
import type { ICallback } from './utils'

export interface IModule {
  id: string
  space: string
  name: string
  desc: string
  icon: string
  path: string
  version: string
  sort: number
}

export type IModuleDefinition = Omit<Partial<IModule>, 'id' | 'name' | 'space'> & {
  id: string
  space: string
  name: string
  menus?: IMenuDefinition[]

  setup?: ICallback
}

export type IModuleInstaller = ICallback
