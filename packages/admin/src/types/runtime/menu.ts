/**
 * Menu type
 */
export type TMenuType = 'space' | 'module' | 'group' | 'page' | 'action' | 'index'

/**
 * Menu Interface
 */
export interface IMenu {
  id: string
  parent: string
  space: string
  module: string
  type: TMenuType
  name: string
  icon: string
  desc: string
  path: string
  sort: number
  isShow: boolean
  children?: IMenu[]
}

/**
 * Menu meta
 */
export type TMenuMeta = Omit<
  IMenu,
  'parent' | 'path' | 'sort' | 'isShow' | 'children'
>

/**
 * Menu definition
 */
export type TMenuDefinition = Omit<Partial<IMenu>, 'id' | 'name' | 'module' | 'children'> & {
  id: string
  name: string
  children?: TMenuDefinition[]
}
