export interface IGoodsTag {
  id: number
  name: string
  sort: number
  createdTime: number
}

export type IGoodsTagDict = ToDictionary<IGoodsTag>
