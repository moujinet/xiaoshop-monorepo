/**
 * 地区编码
 */
export type ILocationCode = string

/**
 * 地区字典
 */
export interface ILocation {
  code: ILocationCode
  name: string
}

/**
 * 嵌套地区字典
 */
export interface ILocationNested extends ILocation {
  children?: ILocationNested[]
}

/**
 * 地区路径 (用于冗余)
 */
export type ILocationPath = ILocation[]
