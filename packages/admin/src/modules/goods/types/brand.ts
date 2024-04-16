import type { IAssetSnapshot } from '@/assets/types'

export interface IGoodsBrand {
  id: number
  name: string
  logo?: IAssetSnapshot
  desc: string
  sort: number
  createdTime: number
}

export type IGoodsBrandDict = ToDictionary<IGoodsBrand>
