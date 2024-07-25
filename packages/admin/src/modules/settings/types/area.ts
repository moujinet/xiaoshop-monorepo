export interface IArea {
  /**
   * 地区编号
   */
  id: number
  /**
   * 省级地区编号
   */
  provinceId: IArea['id']
  /**
   * 市级地区编号
   */
  cityId: IArea['id']
  /**
   * 地区名称
   */
  name: string
  /**
   * 地区简称
   */
  shortName: string
  /**
   * 邮政编码
   */
  code: string
}

export type IAreaNested = IArea & {
  children?: IAreaNested[]
}
