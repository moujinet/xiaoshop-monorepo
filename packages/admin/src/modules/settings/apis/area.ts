export interface IApiAreaListItem {
  /**
   * 地区编号
   */
  id: number
  /**
   * 上级地区编号
   */
  parent: number
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

export type IApiNestedAreaItem = IApiAreaListItem & {
  children?: IApiNestedAreaItem[]
}

/**
 * 获取地区列表
 *
 * @returns Promise<IApiAreaListItem[]>
 */
export function fetchAllAreaList() {
  return useRequest<IApiAreaListItem[]>({
    method: 'get',
    url: '/area/list',
  })
}

/**
 * 获取地区详情
 *
 * @param id number
 * @returns Promise<IApiAreaListItem>
 */
export function fetchAreaDetail(id: number) {
  return useRequest<IApiAreaListItem>({
    method: 'get',
    url: '/area/detail',
    params: {
      id,
    },
  })
}
