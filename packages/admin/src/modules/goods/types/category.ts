export interface IGoodsCategory {
  id: number
  parentId: IGoodsCategory['id']
  name: string
  sort: number
  createdTime: number
}

export type IGoodsCategoryDict = ToDictionary<IGoodsCategory>
