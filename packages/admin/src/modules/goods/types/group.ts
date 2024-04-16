export interface IGoodsGroup {
  id: number
  name: string
  sort: number
  createdTime: number
}

export type IGoodsGroupDict = ToDictionary<IGoodsGroup>
