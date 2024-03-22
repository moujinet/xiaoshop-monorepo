export type IMenuType = 'group' | 'index' | 'page' | 'action'

export interface IMenu {
  id: string
  parent: string
  space: string
  module: string
  type: IMenuType
  name: string
  desc: string
  icon: string
  path: string
  sort: number
  isShow: boolean
  children?: IMenu[]
}

export type IMenuDefinition = Omit<Partial<IMenu>, 'id' | 'name' | 'space' | 'parent' | 'children'> & {
  id: string
  name: string

  children?: IMenuDefinition[]
}
