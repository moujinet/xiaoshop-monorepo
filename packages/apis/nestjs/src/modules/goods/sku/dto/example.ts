import type { IGoodsSku } from '@xiaoshop/schema'
import { nanoNumber, nanoid } from '~/utils/nanoid'

export const example: IGoodsSku = {
  id: nanoid(),
  skuCode: nanoNumber(),
  name: '商品名称',
  specs: [
    {
      specId: nanoid(),
      name: '颜色',
      value: '红色',
    },
  ],
  image: '/assets/1.png',
  price: 199,
  originalPrice: 299,
  costPrice: 99,
  stock: 1000,
  alertStock: 10,
  weight: 0.2,
  volume: 0.01,
  sales: 0,
  views: 0,
  favorites: 0,
}
