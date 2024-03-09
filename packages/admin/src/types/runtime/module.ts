import type { ICallback } from './global'
import type { TMenuDefinition } from './menu'

/**
 * Module Interface
 */
export interface IModule {
  id: string
  space: string
  name: string
  desc: string
  icon: string
  version: string
  sort: number
}

/**
 * Module definition
 */
export type TModuleDefinition = Omit<Partial<IModule>, 'id' | 'name' | 'space'> & {
  id: string
  space: string
  name: string
  menus?: TMenuDefinition[]

  setup?: ICallback
}
