/**
 * Menu type
 */
export type TMenuType = 'space' | 'module' | 'group' | 'page' | 'action' | 'user'

/**
 * Menu Interface
 */
export interface IMenu {
  id: string
  space: string
  module: string
  type: TMenuType
  name: string
  icon: string
  desc: string
  path: string
  sort: number
  isShow: boolean
  isPermission: boolean
  children?: IMenu[]
}

/**
 * Menu definition
 */
export type TMenuDefinition = Omit<Partial<IMenu>, 'id' | 'name' | 'module' | 'children'> & {
  id: string
  name: string
  children?: TMenuDefinition[]
}
