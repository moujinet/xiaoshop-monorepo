export interface IGoodsService {
  id: number
  name: string
  price: number
  desc: string
  sort: number
  createdTime: number
}

export type IGoodsServiceDict = Omit<IGoodsService, 'desc' | 'sort' | 'createdTime'>
