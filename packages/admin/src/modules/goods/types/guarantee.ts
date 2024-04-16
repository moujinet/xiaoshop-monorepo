import type { IAssetSnapshot } from '@/assets/types'

export interface IGoodsGuarantee {
  id: number
  name: string
  icon?: IAssetSnapshot
  desc: string
  sort: number
  createdTime: number
}

export type IGoodsGuaranteeDict = Omit<IGoodsGuarantee, 'desc' | 'sort' | 'createdTime'>
