import type { IGoodsAttributeType } from '@/goods/constants'

export interface IGoodsAttributeTemplate {
  id: number
  name: string
  desc: string
  createdTime: number
}

export interface IGoodsAttributeTemplateAttribute {
  id: number
  templateId: IGoodsAttributeTemplate['id']
  name: string
  type: IGoodsAttributeType
  options: string
  createdTime: number
}

export interface IGoodsAttribute {
  id?: number
  name: string
  type: IGoodsAttributeType
  options: string
  value: string
}
